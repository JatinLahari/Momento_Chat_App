import  jwt  from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import path from "path";
const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, "../.env") });
export const auth = async(req, res, next)=>{
    let {token} = req.cookies;
    try{
        if(!token) return res.status(401).json({message:"Unauthorized user -  No token found."});
        let decode = jwt.verify(token, process.env.THE_KEY_OF_SECRET);
        if(!decode) return res.status(401).json({message:"Unauthorized token!"});
        let user = await User.findById(decode.userId, {password: false});
        req.user = user;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal Server Error"});
    }
}