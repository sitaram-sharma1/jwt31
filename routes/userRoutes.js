import express from 'express';
import UserControllers from '../controllers/userControllers.js';

const userRouter = express.Router();

userRouter.post('/user-registration',UserControllers.userRegistration)

export default userRouter;