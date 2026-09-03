import type { NextFunction, Request, Response } from 'express';
import { getPool, isDbConfigured } from './db';
import { getSessionUser, SessionUser } from './auth';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      sessionUser?: SessionUser;
    }
  }
}

// La compuerta sólo se activa cuando hay base de datos Y se decidió explícitamente
// exigir créditos. Mientras REQUIRE_CREDITS no sea 'true', todas las funciones
// siguen gratis y sin cuenta, igual que hoy — esto permite desplegar la
// infraestructura de antemano sin cambiar el comportamiento actual de la app.
export function monetizationEnabled(): boolean {
  return isDbConfigured() && process.env.REQUIRE_CREDITS === 'true';
}

export async function getBalance(userId: string): Promise<number> {
  const pool = getPool();
  const result = await pool.query('SELECT balance FROM credits WHERE user_id = $1', [userId]);
  return result.rows[0]?.balance ?? 0;
}

async function withLedgerTransaction(
  userId: string,
  featureId: string | null,
  delta: number,
  reason: string
): Promise<void> {
  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      'UPDATE credits SET balance = balance + $1, updated_at = now() WHERE user_id = $2',
      [delta, userId]
    );
    await client.query(
      'INSERT INTO credit_ledger (user_id, feature_id, delta, reason) VALUES ($1, $2, $3, $4)',
      [userId, featureId, delta, reason]
    );
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

// Se llama sólo después de una respuesta real y exitosa de Gemini — nunca
// por adelantado, y nunca cuando la respuesta vino del motor de contingencia local.
export async function debitCredits(userId: string, featureId: string, amount = 1): Promise<void> {
  await withLedgerTransaction(userId, featureId, -amount, 'consumo');
}

// Alta manual de créditos — hoy es el único camino (no hay pasarela de pago
// integrada todavía). Ver server/routes-auth.ts, endpoint /admin/grant-credits.
export async function grantCredits(userId: string, amount: number, reason: string): Promise<void> {
  await withLedgerTransaction(userId, null, amount, reason);
}

export function requireCredits(featureId: string, cost = 1) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!monetizationEnabled()) {
      next();
      return;
    }
    try {
      const user = await getSessionUser(req);
      if (!user) {
        res.status(401).json({
          success: false,
          error: 'auth_required',
          details: 'Iniciá sesión para usar esta función.',
        });
        return;
      }
      const balance = await getBalance(user.id);
      if (balance < cost) {
        res.status(402).json({
          success: false,
          error: 'insufficient_credits',
          balance,
          details: 'No te quedan créditos suficientes para esta función.',
        });
        return;
      }
      req.sessionUser = user;
      next();
    } catch (err: any) {
      // Fail open: si la base de datos falla, no rompemos la app por una
      // consulta — el costo de dejarla pasar es marginal (~USD 0,002).
      console.error('[credits] Error al verificar créditos, se permite la consulta:', err?.message || err);
      next();
    }
  };
}
