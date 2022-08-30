import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
const app = express();
app.use(express.json())

import connectToDB from './congig/dbConnFile.js';
const DATABASE_URI = process.env.DATABASE_URI ;
connectToDB(DATABASE_URI);

import userRouter from './routes/userRoutes.js';
app.use("/user",userRouter);

const PORT = process.env.PORT

app.listen(PORT , () => { console.log(`Listening port ${PORT}`); })