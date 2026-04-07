import {Message, Room} from "../model/message.js";
import { io } from "../app.js";


const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000)

    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
    return `${Math.floor(seconds / 604800)} weeks ago`
}


// Get all rooms for homepage
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find().sort({ createdAt: -1 });
        res.render('home', { rooms, error: req.query.error || null });
    } catch (error) {
        console.log(error);
    }
};



//create a new room
export const createRoom = async (req, res) => {
    try {
        const {name} = req.body;
        if (!name || name.length > 30) {
            return res.redirect('/?error=Name must be between 1 to 30 characters');
        }

        const room = new Room ({name});
        await room.save();
        res.redirect(`/room/${room._id}`);

    }catch (error) {
        console.log(error);
        res.redirect('/?error=An error occurred while creating the room');
}}



// Get messages for a specific room
export const getMessages = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await Room.findById(roomId);
        if (!room) return res.status(404).send('Room not found');

        const messages = await Message.find({ roomId }).sort({ createdAt: 1 }).limit(50);
        const formattedMessages = messages.map(msg => ({
            text: msg.text,
            time: timeAgo(msg.createdAt),
        }));

        res.render('room', { messages: formattedMessages, room });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching messages.' });
    }
};

// Create a new message in a specific room
export const createMessage = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { text } = req.body;
        if (!text || text.length > 300) {
            return res.status(400).json({ error: 'Message must be between 1 and 300 characters.' });
        }
        const message = new Message({ text, roomId });
        await message.save();

        io.to(roomId).emit('newMessage', {
            text: message.text,
            time: 'just now'
        });

        res.redirect(`/room/${roomId}`);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while creating the message.' });
    }
};