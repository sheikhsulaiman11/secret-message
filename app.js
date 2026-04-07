import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import messageRoutes from './routes/messageRoutes.js';
import {createServer} from 'http';
import {Server} from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

export { io };

io.on('connection', (socket) => {
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
    });

    socket.on('disconnect', () => {
    });
});


app.set('view engine', 'ejs');
app.set('trust proxy', 1);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', messageRoutes);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDB connected')
        httpServer.listen(process.env.PORT || 8000, '0.0.0.0', () => {
            console.log('Server running')
        })
    })
    .catch((err) => {
        console.log('MongoDB connection error:', err)  
    })  