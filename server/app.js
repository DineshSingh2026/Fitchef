import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import subscribeRoutes from './routes/subscribeRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';

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

app.use(errorHandler);

export { app };
