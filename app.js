import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import messageRoutes from './routes/messageRoutes.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.set('trust proxy', 1);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('mongoDB connected successfully'))
  .catch((err) => console.log(err));
  
app.set('view engine', 'ejs');


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/messages', messageRoutes);
app.use('/', messageRoutes);



app.listen(process.env.PORT || 8000, '0.0.0.0', () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});