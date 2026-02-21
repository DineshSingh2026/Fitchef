import nodemailer from 'nodemailer';

const NOTIFY_EMAIL = 'bodybank.fit369@gmail.com';

/**
 * Send a notification email to bodybank.fit369@gmail.com (e.g. new subscriber).
 * Uses MAIL_USER + MAIL_APP_PASSWORD in .env (Gmail app password). If not set, no-op.
 * @param {string} subject
 * @param {string} text - plain text body
 * @param {string} [html] - optional HTML body
 * @returns {Promise<boolean>} true if sent, false if skipped or failed (logged)
 */
export async function sendNotifyEmail(subject, text, html) {
  const user = process.env.MAIL_USER || process.env.EMAIL_USER;
  const pass = process.env.MAIL_APP_PASSWORD || process.env.EMAIL_PASS;
  if (!user || !pass) {
    console.warn('[Mail] Mail credentials not set (MAIL_USER/MAIL_APP_PASSWORD or EMAIL_USER/EMAIL_PASS); skipping.');
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { user, pass },
    });
    await transporter.sendMail({
      from: `"FitChef" <${user}>`,
      to: NOTIFY_EMAIL,
      subject,
      text,
      html: html || text.replace(/\n/g, '<br>'),
    });
    console.log('[Mail] Notification sent to', NOTIFY_EMAIL);
    return true;
  } catch (err) {
    console.error('[Mail] Failed to send notification:', err.message);
    return false;
  }
}
