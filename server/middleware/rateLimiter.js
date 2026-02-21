import rateLimit from 'express-rate-limit';

/**
 * General API rate limiter.
 */
const isTest = process.env.NODE_ENV === 'test';
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isTest ? 10000 : 100,
  message: { success: false, message: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Stricter limiter for subscribe endpoint to prevent abuse.
 */
export const subscribeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: isTest ? 10000 : 10,
  message: { success: false, message: 'Too many subscription attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
