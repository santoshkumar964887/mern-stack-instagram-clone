const mongoose = require("mongoose");
const controller = require("../controller/userPostController");
const userRequire = require("../middleware/userRequire");
const express = require("express");
const postRoute = express.Router();
postRoute
  .route("/post")
  .post(userRequire, controller.userPostController)
  .get(userRequire, controller.getAllPosts);
postRoute.route("/mypost").get(userRequire, controller.getMyPost);
postRoute.route("/like").put(userRequire, controller.likePost);
postRoute.route("/dislike").put(userRequire, controller.DisLikePost);
module.exports = postRoute;
