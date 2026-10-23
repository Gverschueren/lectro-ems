CREATE TABLE customers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE installations (
  id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  mode TEXT NOT NULL DEFAULT 'simulator',
  timezone TEXT NOT NULL DEFAULT 'Europe/Brussels',
  created_at TEXT NOT NULL
);

CREATE TABLE gateways (
  id TEXT PRIMARY KEY,
  installation_id TEXT NOT NULL REFERENCES installations(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  firmware_version TEXT,
  last_seen_at TEXT,
  config_version INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL
);

CREATE TABLE telemetry (
  id TEXT PRIMARY KEY,
  installation_id TEXT NOT NULL REFERENCES installations(id) ON DELETE CASCADE,
  captured_at TEXT NOT NULL,
  provider TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  synthetic INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX telemetry_installation_time_idx ON telemetry(installation_id, captured_at);
CREATE INDEX installations_customer_idx ON installations(customer_id);

CREATE TABLE connector_accounts (
  id TEXT PRIMARY KEY,
  installation_id TEXT NOT NULL REFERENCES installations(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  auth_mode TEXT NOT NULL,
  encrypted_credentials TEXT,
  scopes_json TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'pending',
  terms_reviewed_at TEXT,
  created_at TEXT NOT NULL,
  UNIQUE(installation_id, provider)
);

CREATE TABLE strategies (
  id TEXT PRIMARY KEY,
  installation_id TEXT NOT NULL REFERENCES installations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 0,
  config_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL
);

CREATE TABLE tariffs (
  id TEXT PRIMARY KEY,
  installation_id TEXT NOT NULL REFERENCES installations(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  price_per_kwh REAL NOT NULL,
  starts_at TEXT NOT NULL,
  ends_at TEXT NOT NULL
);

CREATE TABLE alerts (
  id TEXT PRIMARY KEY,
  installation_id TEXT NOT NULL REFERENCES installations(id) ON DELETE CASCADE,
  severity TEXT NOT NULL,
  code TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL,
  resolved_at TEXT
);
