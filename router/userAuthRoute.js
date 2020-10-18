import express from 'express';
import userModel from '../model/userModel.js';
const userRouter=express.Router();

userRouter.get('/',(req,res)=>{
    console.log('santosh')
   res.send("hello")
});
userRouter.post('/signup',async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password ){
        return res.status(422).json({
            status:"fail",
            message:"every fields must have value"
        })
    }
   const data= await userModel.create({ name,email,password});
    res.status(201).json({
        status:"success",
        message:"new user has been created",
        data:{
            data
        }
    })

})
export default userRouter;