import express from "express";
import mongoose from "mongoose"
import {config} from "dotenv"
import taskrouter from "./routes/task.js"
import userrouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import { errormiddleware } from "./middlewares/error.js";
import cors from "cors"

export const app = express();
config({
    path:"./data/config.env",
})
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","PUT","POST","DELETE"],
    credentials: true,
}) )

app.use("/users"  ,userrouter)
app.use("/task"  ,taskrouter)
app.get("/",(req,res)=>{
   
    res.send("nice working")
})

app.use(errormiddleware)
   
