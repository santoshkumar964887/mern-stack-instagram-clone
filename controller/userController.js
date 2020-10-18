const userModel = require('../model/userModel.js');
const bcrypt = require("bcryptjs");
exports.signupNewUser=async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password ){
        return res.status(422).json({
            status:"fail",
            message:"every fields must have value"
        })
    };
    try{
     const haspassword= await bcrypt.hash(password,12);
   const data= await userModel.create({ name,email,password:haspassword});
    res.status(201).json({
        status:"success",
        message:"new user has been created",
        data:{
            data
        }
    })
} catch(error){
    return res.status(424).json({
        status:"fail",
        message:error
    })
}
}