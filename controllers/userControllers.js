import { log } from "console"

class UserControllers 
{
                    // _____________________________________
                    // |       NEW USER REGISTRATION       |
                    // |___________________________________|
    static userRegistration = async (req,res) =>
    {
        console.log("user reg");
        res.send("registr")
    }
}

export default UserControllers