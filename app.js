import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import messageRoutes from './routes/messageRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('trust proxy', 1);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', messageRoutes);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDB connected')
        app.listen(process.env.PORT || 8000, '0.0.0.0', () => {
            console.log('Server running')
        })
    })
    .catch((err) => {
        console.log('MongoDB connection error:', err)  
    })