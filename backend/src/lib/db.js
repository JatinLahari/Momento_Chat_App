import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, "../.env") });
export const connectDB = async () =>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } 
    catch (error) {
        console.log("MongoDB connection error: ", error);
    }
};