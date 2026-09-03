// Esquema de la base de datos de cuentas y créditos.
// Se ejecuta de forma idempotente (CREATE TABLE IF NOT EXISTS) al primer request
// que la necesite — no hay migraciones separadas para un esquema de este tamaño.
export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS credits (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  balance INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS features (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  cost INTEGER NOT NULL DEFAULT 1
);

INSERT INTO features (id, label, cost) VALUES
  ('exegesis_ai', 'Exégesis de Pasajes', 1),
  ('dialogo_analitico', 'Diálogo Analítico', 1)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS credit_ledger (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  feature_id TEXT REFERENCES features(id),
  delta INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS magic_link_tokens (
  token TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ
);
`;
