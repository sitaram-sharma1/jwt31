import express from 'express';
import UserControllers from '../controllers/userControllers.js';

const userRouter = express.Router();

import checkAuthUser from '../middlewares/AuthUser.js';
userRouter.use('/user-change-password',checkAuthUser)
userRouter.use('/user-logout',checkAuthUser)
userRouter.use('/user-logged',checkAuthUser)

// public routes
userRouter.post('/user-registration',UserControllers.userRegistration)
userRouter.post('/user-login',UserControllers.userLogin)

// private routes
userRouter.post('/user-logout', UserControllers.userLogout)
userRouter.post('/user-logged',UserControllers.loggedUser)

// protected routes
userRouter.post('/user-change-password',UserControllers.userChangePassword)

export default userRouter;