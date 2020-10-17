import express from 'express';
const userRouter=express.Router();

userRouter.get('/',(req,res)=>{
    console.log('santosh')
   res.send("hello")
});
userRouter.post('/signup',(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password ){
        return res.status(422).json({
            status:"fail",
            message:"every fields must have value"
        })
    }
    res.status(201).json({
        status:"success",
        message:"new user has been created"
    })

})
export default userRouter;