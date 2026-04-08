import express from 'express';
import { createMessage, getMessages, getRooms, createRoom } from '../controller/messageController.js';
import rateLimiter from '../middleware/rateLimiter.js';

const router = express.Router();

router.get('/', getRooms);                                      // homepage — lists all rooms
router.post('/room', rateLimiter, createRoom);                  // creates a new named room
router.get('/room/:roomId', getMessages);                       // specific room's messages
router.post('/room/:roomId', rateLimiter, createMessage);       // send message to room

export default router;