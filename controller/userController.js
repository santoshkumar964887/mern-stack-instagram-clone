const userModel = require("../model/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
//signup process
exports.signupNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({
      status: "fail",
      message: "every fields must have value",
    });
  }
  try {
    const haspassword = await bcrypt.hash(password, 12);
    const data = await userModel.create({ name, email, password: haspassword });
    res.status(201).json({
      status: "success",
      message: "new user has been created",
      data: {
        data,
      },
    });
  } catch (error) {
    return res.status(424).json({
      status: "fail",
      message: error,
    });
  }
};
//log In controller
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      status: "fail",
      message: "please provide email id and password",
    });
  }
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(422).json({
        status: "fail",
        message: "please provide valid email id and password",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
      const { _id, name, email } = user;
      return res.status(200).json({
        status: "success",
        message: "you have been login",
        user: {
          _id,
          name,
          email,
        },
        token,
      });
    } else {
      return res.status(422).json({
        status: "fail",
        message: "please provide valid email id and password",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};
