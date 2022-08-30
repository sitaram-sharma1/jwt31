import mongoose from 'mongoose'

const connectToDB = async (DATABASE_URI) => {
    try 
    {
        const DB_OPTIONS = {
            dbName:"KetanDB",
        }
        mongoose.connect(DATABASE_URI,DB_OPTIONS)
        console.log("Database connected");
    } 
    catch (error) 
    {        
        console.log(error);
    }
} 
// connectToDB()

export default connectToDB