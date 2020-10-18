const express = require("express");
const userController = require("../controller/userController");
const userRouter = express.Router();
userRouter.route("/signup").post(userController.signupNewUser);
userRouter.route('/login').post(userController.loginUser);
module.exports = userRouter;
