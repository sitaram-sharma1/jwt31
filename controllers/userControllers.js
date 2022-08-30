import UserModel from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

class UserControllers 
{                   // _____________________________________
                    // |       NEW USER REGISTRATION       |
                    // |___________________________________|
    static userRegistration = async (req,res) =>
    {
        try 
        {
            const {name,email,password,tc} = await req.body
            if(name && email && password && tc)
            {
                const isEmailRegistered = await UserModel.findOne({email:email})
                if(isEmailRegistered === null) 
                {
                    const salt =await bcrypt.genSalt(10);
                    const hashedPassword =await bcrypt.hash(password,salt);   
                    const newUser = new UserModel({
                                                    name:name,
                                                    email:email,
                                                    password:hashedPassword,
                                                    tc:tc
                                                    })
                    await newUser.save();
                    const token =await jwt.sign({"userID":newUser._id},process.env.JWT_SECRET_KEY,{expiresIn:"2d"})
                    await UserModel.findByIdAndUpdate(newUser._id , {$set :{"token":token}});
                    console.log(token);
                    res.status(201).send({"status":"Success","message":"Registered Successfully"});
                }
                else
                {
                    res.status(400).send({"status":"failed","message":"This email id is already registered. Try again with different email id."});
                }
            }
            else
            {
                res.status(400).send({"status":"failed","message":"All fields are required"});
            }
        } 
        catch (error) 
        {
            res.status(400).send({"status":"failed","message":"Registration failed ! Try again"})
        }
    }                   // _____________________________________
                        // |            USER LOGIN             |
                        // |___________________________________|
    static userLogin = async (req,res) =>
    {
        try
        {
            const { email , password } = req.body
            res.status(200).send({"status":"Success","message":"Logged-in Successfully"});
        }
        catch (error) 
        {
            res.status(400).send({"status":"failed","message":"try again to Log-in "})
        }
    }
}

export default UserControllers