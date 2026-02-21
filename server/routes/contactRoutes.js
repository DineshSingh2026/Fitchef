import express from 'express';
import { getContact } from '../controllers/contactController.js';

const router = express.Router();

router.get('/contact', getContact);

export default router;
