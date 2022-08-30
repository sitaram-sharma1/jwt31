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
                    res.status(201).send({"status":"Success","message":"Registered Successfully","token":token});
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
                        // |            USER LOG-IN            |
                        // |___________________________________|
    static userLogin = async (req,res) =>
    {
        try
        {
            const { email , password } = req.body
            if( email && password )
            {
                const user =await UserModel.findOne({email:email})
                if( user != null )
                {
                    const isMatched = await bcrypt.compare(password,user.password)
                    if(isMatched)
                    {
                        const token =await jwt.sign({"userID":user._id},process.env.JWT_SECRET_KEY,{expiresIn:"2d"});
                        await UserModel.findByIdAndUpdate(user._id,{$set:{"token":token}})
                        await res.status(200).send({"status":"Success","message":"Logged-in Successfully","token":token});
                    }
                    else
                    {
                        await res.status(400).send({"status":"failed","message":"Please enter correct email-id or password"});
                    }
                }
                else
                {
                    await res.status(400).send({"status":"failed","message":"Invalid user"});
                }
            }
            else
            {
                res.status(400).send({"status":"failed","message":"All fields are required"});
            }
        }
        catch (error) 
        {
            res.status(400).send({"status":"failed","message":"try again to Log-in "})
        }
    }                   // _____________________________________
                        // |            USER LOG-OUT           |
                        // |___________________________________|
    static userLogout = async (req,res) =>
    {
        try 
        {
            console.log(req.user);
            await UserModel.findByIdAndUpdate(req.user._id,{$set:{"token":""}})
            await res.status(200).send({"status":"success","message":"Logged out successfully"})
            // await res.status(400).send({"status":"failed","message":"invalid user Token, cant perform this activity"})  
        } 
        catch (error) 
        {
            await res.status(400).send({"status":"failed","message":"try again to Log-out "}) 
        }
    }
    // _________________________________________________________________________
    // |                        CHANGE PASSWORD                                |
    // |_____________________MIDDLEWARE-VALIDATION_____________________________|
    //
    static userChangePassword = async (req,res) =>
    {
        try 
        {      
            const { newPassword , confirmNewPassword } = req.body ;
            if( newPassword && confirmNewPassword )
            {
                if( newPassword === confirmNewPassword)
                {
                    const salt =await bcrypt.genSalt(10);
                    const newHashedPassword =await bcrypt.hash(newPassword,salt);
                    await UserModel.findByIdAndUpdate(req.user._id,{$set:{"password":newHashedPassword}})
                    console.log(newHashedPassword);
                    await res.status(200).send({"status":"success","message":"password updated successfully"})
                }
                else
                {
                    await res.status(400).send({"status":"failed","message":"password and confirm password don't matched"})
                }                    
            }
            else
            {
                await res.status(400).send({"status":"failed","message":"All fields are required."})
            }
        }
        catch (error) 
        {
        }
    }    
}

export default UserControllers