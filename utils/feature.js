
import  Jwt  from "jsonwebtoken";
export const sendcookie=(User,res,message,statuscode=200)=>{
    const token =  Jwt.sign({ _id: User._id},"bskbaskdbak");
   
res.status(statuscode).cookie("token",token,{
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    sameSite: "Development"?"lax":"none",
    secure:"Development"? false: true,
}).json({
    success:true,
    message,
})
}


