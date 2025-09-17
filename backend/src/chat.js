import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js"
import messageRouter from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import{chat, server} from "./lib/socket.js";

import path from "path";
const __dirname = path.resolve();

dotenv.config({ path: path.join(__dirname, "../.env") });
chat.use(express.json());
chat.use(cookieParser());
chat.use(cors({
    origin: process.env.CLIENT_URL  || "http://localhost:5173",
    credentials: true
}));

chat.use("/user", userRouter);
chat.use("/message", messageRouter);

if(process.env.NODE_ENV==='production'){
    // chat.use(express.static(path.join(__dirname, "../../frontend/dist")));
    const pa = path.join(__dirname, "../../frontend/dist");

    chat.use(express.static(pa));

    chat.get("/", (req, res)=>{
        // console.log("Serving index.html: ",req.url);
        res.sendFile(path.join(pa, "index.html"));
    })
}

server.listen(process.env.PORT,()=>{
    console.log("Server Started...");
    connectDB();
});