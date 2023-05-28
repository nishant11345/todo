import { user} from "../models/user.js";
import bcrypt from "bcrypt"

import  Jwt  from "jsonwebtoken";
import { sendcookie } from "../utils/feature.js";

    export const login = async(req,res)=>{
       const {email,password} = req.body
       const User = await user.findOne({email});
       if(!User) return res.status(404).json({
        successs: false,
        message: "invalid email or password",
       
    });
    // const isMatch = await bcrypt.compare(password, user.password);
    // if(!isMatch) return res.status(404).json({
    //     successs: false,
    //    message: "invalid email or password",
      
    // });
    sendcookie(User,res,`welcome back`,200 );
    
        }
    export const register = async(req,res)=>{
const {name,email,password}= req.body;
let User = await user.findOne({email})
if(User) return res.status(404).json({
    successs: false,
    message: "user already exist"
});
const hashpassword = await bcrypt.hash(password,10)

User=await user.create({name,email,password: hashpassword});
sendcookie(User,res,"registered succesfully", 201)
}    
        


        export const getmyprofile= (req,res)=>{
            const id ="myid";
           
          

             res.status(200).json({
                 success:true,
                 User:req.User

             })
            }
           export const logout =(req,res)=>{
           
           
          

             res.status(200).cookie("token","",{expire:new Date(Date.now()),
                sameSite: "Development"?"lax":"none",
                secure:"Development"? false: true,
            
            
            }).json({
                 success:true,
                 User:req.User

             })
            }