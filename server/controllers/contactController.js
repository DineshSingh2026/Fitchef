import { getPool } from '../config/db.js';

const DEFAULT_WHATSAPP = '919502575669';

/**
 * GET /api/contact - Public contact config (e.g. WhatsApp number for support).
 */
export async function getContact(req, res, next) {
  try {
    const pool = getPool();
    if (!pool) {
      return res.json({ success: true, whatsappNumber: DEFAULT_WHATSAPP });
    }
    const result = await pool.query(
      `SELECT key, value FROM app_settings WHERE key = 'whatsapp_number'`
    );
    const row = result.rows[0];
    const whatsappNumber = row ? String(row.value).replace(/\D/g, '').slice(-15) : '';
    return res.json({
      success: true,
      whatsappNumber: whatsappNumber || DEFAULT_WHATSAPP,
    });
  } catch (err) {
    return res.json({ success: true, whatsappNumber: DEFAULT_WHATSAPP });
  }
}
