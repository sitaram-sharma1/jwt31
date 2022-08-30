import mongoose from "mongoose";
const User_Schema = mongoose.Schema({
    name : { type : String , required : true , trim : true },
    email : { type : String , required : true , trim : true },
    password : { type : String , required : true , trim : true },
    tc : { type : Boolean , required : true },
    token : { type : String , default : "EmptyToken" }
})

const UserModel = mongoose.model("userCollection",User_Schema)
export default UserModel;