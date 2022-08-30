import express from 'express';
import UserControllers from '../controllers/userControllers.js';

const userRouter = express.Router();

// public routes
userRouter.post('/user-registration',UserControllers.userRegistration)
userRouter.post('/user-login',UserControllers.userLogin)

export default userRouter;