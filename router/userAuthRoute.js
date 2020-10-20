const express = require("express");
const userController = require("../controller/userController");
const protected =require('../middleware/userRequire');
const userRouter = express.Router();
userRouter.route('/').post(protected,(req,res)=>{
    res.send("hello")
})
userRouter.route("/signup").post(userController.signupNewUser);
userRouter.route('/login').post(userController.loginUser);
module.exports = userRouter;
