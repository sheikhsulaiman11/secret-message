import express form 'express';
import { createMessage, getMessage } from '../controllers/messageController.js';
import rateLimiter from '../middleware/rateLimiter.js';
const router = express.Router();

