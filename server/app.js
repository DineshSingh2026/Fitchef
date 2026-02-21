import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { getPool } from './config/db.js';
import subscribeRoutes from './routes/subscribeRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json({ limit: '10kb' }));
app.use(logger);
app.use('/api', apiLimiter);
app.use('/api', subscribeRoutes);
app.use('/api', contactRoutes);

app.get('/api/health', async (req, res) => {
  const pool = getPool();
  let db = 'unconfigured';
  if (pool) {
    try {
      await pool.query('SELECT 1');
      db = 'ok';
    } catch (e) {
      db = 'error';
    }
  }
  res.json({
    success: true,
    message: 'FitChef API is running.',
    db,
  });
});

// In production, serve the built React app from client/dist (when using Render Web Service)
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../client/dist');
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.use(errorHandler);

export { app };
