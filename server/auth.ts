import { SignJWT, jwtVerify } from 'jose';
import { randomUUID, randomBytes } from 'crypto';
import type { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { getPool } from './db';

const SESSION_COOKIE = 'theorie_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 días
const MAGIC_LINK_TTL_MS = 1000 * 60 * 20; // 20 minutos

export interface SessionUser {
  id: string;
  email: string;
  displayName: string | null;
}

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error('SESSION_SECRET no está configurada.');
  }
  return new TextEncoder().encode(secret);
}

export async function issueSession(res: Response, user: SessionUser): Promise<void> {
  const token = await new SignJWT({ email: user.email, name: user.displayName })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey());

  res.cookie(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_TTL_SECONDS * 1000,
    path: '/',
  });
}

export function clearSession(res: Response): void {
  res.clearCookie(SESSION_COOKIE, { path: '/' });
}

export async function getSessionUser(req: Request): Promise<SessionUser | null> {
  const token = req.cookies?.[SESSION_COOKIE];
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return {
      id: String(payload.sub),
      email: String(payload.email),
      displayName: (payload.name as string | null) ?? null,
    };
  } catch {
    return null;
  }
}

export async function getOrCreateUserByEmail(
  email: string,
  displayName: string | null
): Promise<SessionUser> {
  const pool = getPool();
  const normalized = email.toLowerCase().trim();
  const existing = await pool.query(
    'SELECT id, email, display_name FROM users WHERE email = $1',
    [normalized]
  );
  if (existing.rows.length > 0) {
    const row = existing.rows[0];
    return { id: row.id, email: row.email, displayName: row.display_name };
  }
  const id = randomUUID();
  await pool.query(
    'INSERT INTO users (id, email, display_name) VALUES ($1, $2, $3)',
    [id, normalized, displayName]
  );
  await pool.query(
    'INSERT INTO credits (user_id, balance) VALUES ($1, 0) ON CONFLICT (user_id) DO NOTHING',
    [id]
  );
  return { id, email: normalized, displayName };
}

// --- Google Sign-In ---

let googleClient: OAuth2Client | null = null;
function getGoogleClient(): OAuth2Client {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error('GOOGLE_CLIENT_ID no está configurada.');
  }
  if (!googleClient) {
    googleClient = new OAuth2Client(clientId);
  }
  return googleClient;
}

export async function loginWithGoogle(idToken: string): Promise<SessionUser> {
  const client = getGoogleClient();
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload?.email || !payload.email_verified) {
    throw new Error('No se pudo verificar el email de la cuenta de Google.');
  }
  return getOrCreateUserByEmail(payload.email, payload.name ?? null);
}

// --- Enlace mágico por email ---

export async function requestMagicLink(email: string): Promise<string> {
  const pool = getPool();
  const token = randomBytes(24).toString('hex');
  const expiresAt = new Date(Date.now() + MAGIC_LINK_TTL_MS);
  await pool.query(
    'INSERT INTO magic_link_tokens (token, email, expires_at) VALUES ($1, $2, $3)',
    [token, email.toLowerCase().trim(), expiresAt]
  );
  return token;
}

export async function consumeMagicLink(token: string): Promise<SessionUser> {
  const pool = getPool();
  const result = await pool.query(
    'SELECT email, expires_at, used_at FROM magic_link_tokens WHERE token = $1',
    [token]
  );
  if (result.rows.length === 0) {
    throw new Error('El enlace no es válido.');
  }
  const row = result.rows[0];
  if (row.used_at) {
    throw new Error('Este enlace ya fue utilizado.');
  }
  if (new Date(row.expires_at).getTime() < Date.now()) {
    throw new Error('Este enlace expiró — pedí uno nuevo.');
  }
  await pool.query('UPDATE magic_link_tokens SET used_at = now() WHERE token = $1', [token]);
  return getOrCreateUserByEmail(row.email, null);
}
