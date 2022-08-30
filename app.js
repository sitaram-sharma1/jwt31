import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
const app = express();

import userRouter from './routes/userRoutes.js';
app.use("/user",userRouter);

const PORT = process.env.PORT

app.listen(PORT , () => { console.log(`Listening port ${PORT}`); })