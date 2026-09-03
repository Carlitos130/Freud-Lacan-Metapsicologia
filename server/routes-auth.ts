import { Router } from 'express';
import {
  clearSession,
  consumeMagicLink,
  getOrCreateUserByEmail,
  getSessionUser,
  issueSession,
  loginWithGoogle,
  requestMagicLink,
} from './auth';
import { ensureMigrated, isDbConfigured } from './db';
import { getBalance, grantCredits } from './credits';
import { sendMagicLinkEmail } from './email';

const router = Router();

router.get('/me', async (req, res) => {
  if (!isDbConfigured()) {
    res.json({ authenticated: false, dbConfigured: false });
    return;
  }
  try {
    await ensureMigrated();
    const user = await getSessionUser(req);
    if (!user) {
      res.json({ authenticated: false, dbConfigured: true });
      return;
    }
    const balance = await getBalance(user.id);
    res.json({ authenticated: true, dbConfigured: true, user, balance });
  } catch (err: any) {
    res.status(500).json({ authenticated: false, error: err.message });
  }
});

router.post('/google', async (req, res) => {
  try {
    await ensureMigrated();
    const { idToken } = req.body;
    if (!idToken || typeof idToken !== 'string') {
      res.status(400).json({ success: false, error: 'idToken es requerido.' });
      return;
    }
    const user = await loginWithGoogle(idToken);
    await issueSession(res, user);
    const balance = await getBalance(user.id);
    res.json({ success: true, user, balance });
  } catch (err: any) {
    res.status(401).json({ success: false, error: err.message });
  }
});

router.post('/magic-link/request', async (req, res) => {
  try {
    await ensureMigrated();
    const { email } = req.body;
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      res.status(400).json({ success: false, error: 'Ingresá un email válido.' });
      return;
    }
    const token = await requestMagicLink(email);
    const appUrl = (process.env.APP_URL || 'http://localhost:3000').replace(/\/$/, '');
    const link = `${appUrl}/api/auth/magic-link/verify?token=${token}`;
    await sendMagicLinkEmail(email, link);
    res.json({ success: true, message: 'Revisá tu email — te enviamos un enlace de acceso.' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/magic-link/verify', async (req, res) => {
  try {
    await ensureMigrated();
    const token = String(req.query.token || '');
    const user = await consumeMagicLink(token);
    await issueSession(res, user);
    res.redirect('/');
  } catch (err: any) {
    res.status(400).send(`No se pudo verificar el enlace: ${err.message}`);
  }
});

router.post('/logout', (req, res) => {
  clearSession(res);
  res.json({ success: true });
});

// Alta manual de créditos, protegida por un secreto compartido — puente
// hasta que Mercado Pago/PayPal estén integrados (Fases 2 y 3 de la hoja de
// ruta). Uso: POST con header X-Admin-Secret y body { email, amount }.
router.post('/admin/grant-credits', async (req, res) => {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret || req.headers['x-admin-secret'] !== adminSecret) {
    res.status(403).json({ success: false, error: 'No autorizado.' });
    return;
  }
  try {
    await ensureMigrated();
    const { email, amount } = req.body;
    if (!email || typeof email !== 'string' || !Number.isFinite(amount) || amount <= 0) {
      res.status(400).json({ success: false, error: 'email y amount (positivo) son requeridos.' });
      return;
    }
    const user = await getOrCreateUserByEmail(email, null);
    await grantCredits(user.id, Math.floor(amount), 'alta manual');
    const balance = await getBalance(user.id);
    res.json({ success: true, user, balance });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
