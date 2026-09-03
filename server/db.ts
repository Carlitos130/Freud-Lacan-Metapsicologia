import { Pool } from 'pg';
import { SCHEMA_SQL } from './schema';

let pool: Pool | null = null;
let migratedPromise: Promise<void> | null = null;

export function isDbConfigured(): boolean {
  return !!process.env.DATABASE_URL;
}

export function getPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL no está configurada.');
  }
  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false },
    });
  }
  return pool;
}

// Ejecuta el esquema una sola vez por proceso, la primera vez que una ruta de
// auth/créditos lo necesita. Es un no-op si DATABASE_URL no está configurada.
export function ensureMigrated(): Promise<void> {
  if (!isDbConfigured()) {
    return Promise.resolve();
  }
  if (!migratedPromise) {
    migratedPromise = getPool()
      .query(SCHEMA_SQL)
      .then(() => undefined)
      .catch((err) => {
        migratedPromise = null; // permite reintentar en el próximo request
        throw err;
      });
  }
  return migratedPromise;
}
