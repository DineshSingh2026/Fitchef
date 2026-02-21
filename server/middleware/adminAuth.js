/**
 * Protects admin routes with a simple API key from X-API-Key header or query.
 */
export function adminAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  const expectedKey = process.env.ADMIN_API_KEY;

  if (!expectedKey) {
    console.warn('[Admin] ADMIN_API_KEY not set');
    return res.status(503).json({ success: false, message: 'Admin API not configured.' });
  }

  if (!apiKey || apiKey !== expectedKey) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }

  next();
}
