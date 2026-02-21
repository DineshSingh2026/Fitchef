import { getPool } from '../config/db.js';
import { sendNotifyEmail } from '../lib/mail.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate and sanitize email: trim and basic format check.
 */
function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim().toLowerCase();
  return trimmed.length > 0 && trimmed.length <= 254 && EMAIL_REGEX.test(trimmed);
}

/**
 * POST /api/subscribe - Add email to early access list.
 */
export async function subscribe(req, res, next) {
  try {
    const rawEmail = req.body?.email;
    if (!rawEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email is required.',
      });
    }

    const email = rawEmail.trim().toLowerCase();
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    const pool = getPool();
    if (!pool) {
      return res.status(503).json({
        success: false,
        message: 'Subscription is temporarily unavailable. Please try again later.',
      });
    }
    const result = await pool.query(
      `INSERT INTO subscribers (id, email) VALUES (gen_random_uuid(), $1) RETURNING id, email, created_at`,
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(500).json({
        success: false,
        message: 'Subscription could not be saved. Please try again.',
      });
    }

    // Notify bodybank.fit369@gmail.com (fire-and-forget; don't block or fail the response)
    sendNotifyEmail(
      'FitChef: New early access signup',
      `A new user subscribed for early access.\n\nEmail: ${email}\nTime: ${new Date().toISOString()}`,
      `<p>A new user subscribed for early access.</p><p><strong>Email:</strong> ${email}</p><p><strong>Time:</strong> ${new Date().toISOString()}</p>`
    ).catch(() => {});

    return res.status(201).json({
      success: true,
      message: 'Successfully subscribed for early access.',
    });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({
        success: false,
        message: 'Email already registered.',
      });
    }
    if (err.code === '42P01' || err.code === 'ECONNREFUSED' || err.message?.includes('relation') || err.message?.includes('does not exist')) {
      return res.status(503).json({
        success: false,
        message: 'Subscription is temporarily unavailable. Please try again later.',
      });
    }
    next(err);
  }
}

/**
 * GET /api/admin/subscribers - List all subscribers (API key protected).
 */
export async function getSubscribers(req, res, next) {
  try {
    const pool = getPool();
    if (!pool) {
      return res.status(503).json({
        success: false,
        message: 'Database not configured.',
      });
    }
    const result = await pool.query(
      `SELECT id, email, created_at FROM subscribers ORDER BY created_at DESC`
    );
    return res.json({
      success: true,
      count: result.rowCount,
      subscribers: result.rows,
    });
  } catch (err) {
    next(err);
  }
}
