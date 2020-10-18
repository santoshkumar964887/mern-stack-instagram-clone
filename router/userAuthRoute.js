const express = require("express");
const userController = require("../controller/userController");
const userRouter = express.Router();

userRouter.route("/").get((req, res) => {
  console.log("santosh");
  res.send("hello");
});
userRouter.route("/signup").post(userController.signupNewUser);
module.exports = userRouter;
