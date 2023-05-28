import { user } from "../models/user.js";
import  Jwt  from "jsonwebtoken";

export const isAuthenticated = async(req,res,next)=>{

    const {token}= req.cookies;
    
     if(!token) return res.status(404).json({
        successs: false,
        message: "login first"
 });
const decoded = Jwt.verify(token, "bskbaskdbak");
req.User= await user.findById(decoded._id);
next();
};