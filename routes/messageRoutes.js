import express from 'express';
import { createMessage } from '../controller/messageController.js';
import rateLimiter from '../middleware/rateLimiter.js';
const router = express.Router();

router.post('/', rateLimiter, createMessage);

export default router;