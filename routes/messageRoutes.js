import express from 'express';
import { createMessage, getMessages } from '../controller/messageController.js';
import rateLimiter from '../middleware/rateLimiter.js';
const router = express.Router();

router.post('/', rateLimiter, createMessage);
router.get('/', getMessages);   

export default router;