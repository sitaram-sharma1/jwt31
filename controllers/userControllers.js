import UserModel from "../models/User.js";
import bcrypt from 'bcrypt';
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
                const isEmailRegistered =await UserModel.find({email:email})
                if(isEmailRegistered !== null) 
                {
                    const salt =await bcrypt.genSalt(10);
                    console.log("here");
                    const hashedPassword =await bcrypt.hash(password,salt);
                    console.log(hashedPassword);
                    await res.send("registr")            
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
    }
}

export default UserControllers