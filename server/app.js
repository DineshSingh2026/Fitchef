import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import subscribeRoutes from './routes/subscribeRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*', credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(logger);
app.use('/api', apiLimiter);
app.use('/api', subscribeRoutes);
app.use('/api', contactRoutes);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'FitChef API is running.' });
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
