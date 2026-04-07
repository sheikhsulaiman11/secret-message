import Message from "../model/message.js";


const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000)

    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
    return `${Math.floor(seconds / 604800)} weeks ago`
}

// Create a new message
export const createMessage = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || text.length > 300) {
            return res.status(400).json({ error: 'Message must be between 1 and 300 characters.' });
        }
        const message = new Message({ text });
        await message.save();
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while creating the message.' });
    }
};


export const getMessages = async (req, res) => {
    const messages = await Message.find().sort({ createdAt: 1 }).limit(50)
    const formattedMessages = messages.map(msg => ({
        text: msg.text,
        time: timeAgo(msg.createdAt) ,
        
    }))
    res.render('index', { messages: formattedMessages  })
}