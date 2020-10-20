const jwt=require('jsonwebtoken');
const mongoose= require('mongoose');
const userModel=require('../model/userModel');
const dotenv=require('dotenv');
dotenv.config({path:'../config.env'});
module.exports=(req,res, next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        return res.status(401).json({status:"fail",message:"you must be loggged in"});
    }
    const token = authorization.replace("Bearer ","");
   jwt.verify(token,process.env.JWT_KEY,(err,payload)=>{
    if(err){
        return  res.status(401).json({status:"fail",message:"you must be loggged in"});
    }
    const{_id}=payload;
    userModel.findById(_id).then(userData=>{
        req.user=userData
    })
    

   })

next();
}