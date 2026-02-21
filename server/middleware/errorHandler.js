/**
 * Centralized error handler middleware.
 * Returns consistent JSON and proper status codes.
 */
export function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  console.error(`[Error] ${req.method} ${req.path} - ${status}: ${message}`);

  res.status(status).json({
    success: false,
    message: status === 500 ? 'Something went wrong. Please try again later.' : message,
  });
}
