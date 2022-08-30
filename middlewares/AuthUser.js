import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';
const checkAuthUser =async (req,res,next) =>
{
    try
    {
        const {authorization} =await req.headers ;
        const token =await authorization.split(" ")[1];
        const {userID} =await jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = await UserModel.findById(userID,{password:0});        
        // await req.user = 
        next();
    }
    catch (error)
    {
        await res.status(400).send({"status":"failed","message":"Invalid user "})
    }
}

export default checkAuthUser;