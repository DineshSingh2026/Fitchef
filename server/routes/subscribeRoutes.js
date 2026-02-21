import express from 'express';
import { subscribe, getSubscribers } from '../controllers/subscribeController.js';
import { subscribeLimiter } from '../middleware/rateLimiter.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/subscribe', subscribeLimiter, subscribe);

router.get('/admin/subscribers', adminAuth, getSubscribers);

export default router;
