import Message from "../model/message.js";
import rateLimiter from "../middleware/rateLimiter.js";

// Create a new message
export const createMessage = rateLimiter ,async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || text.length > 300) {
            return res.status(400).json({ error: 'Message must be between 1 and 300 characters.' });
        }
        const message = new Message({ text });
        await message.save();
        res.status(201).json({ message: 'Message created successfully', id: message._id });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the message.' });
    }
};

