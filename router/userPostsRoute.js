const mongoose= require('mongoose');
const controller=require('../controller/userPostController');
const userRequire=require('../middleware/userRequire');
const express=require('express');
const postRoute=express.Router();
postRoute.route('/post').post(userRequire,controller.userPostController).get(controller.getAllPosts);


module.exports=postRoute;