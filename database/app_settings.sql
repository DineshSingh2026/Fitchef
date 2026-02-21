-- App settings (e.g. WhatsApp contact). Run after schema.sql.
CREATE TABLE IF NOT EXISTS app_settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO app_settings (key, value) VALUES ('whatsapp_number', '919502575669')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

COMMENT ON TABLE app_settings IS 'Site config: whatsapp_number (with country code, no + or spaces)';
