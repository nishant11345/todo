import errorhandler from "../middlewares/error.js";
import { task } from "../models/task.js";

export const newtask = async(req,res,next)=>{
   try {
    const {title,description}= req.body;

    await task.create({
        title,
        description,
        user: req.User,
    });
    res.status( 201).json({
        success:true,
        message: "task added",
    
    })
   } catch (error) {
    next(error)
   }

}
export const getmytask = async(req,res,next)=>{
   try {
    const userid= req.User._id;
   const Tasks = await task.find({user: userid});

   res.status(200).json({
    success:true,
Tasks,
   })
   } catch (error) {
    next(error)
   }
}
export const updatetask= async(req,res,next)=>{
    

const Task = await task.findById(req.params.id);
try {
    if(!Task) return next(new errorhandler())
Task.isCompleted= !Task.isCompleted
await Task.save()
    res.status(200).json({
     success:true,
     message: "task updated " 

    })
} catch (error) {
    next(error)
}
 }
 export const deletetask = async(req,res,next)=>{
  
    try {
        const Task = await task.findById(req.params.id);
    
    if(!Task) return next(new errorhandler())
    await Task.deleteOne()
    res.status(200).json({
     success:true,
    
     message: "task deleted  "

    })
    } catch (error) {
        next(error)
    }
 }