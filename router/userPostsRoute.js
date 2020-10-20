const mongoose= require('mongoose');
const controller=require('../controller/userPostController');
const express=require('express');
const postRoute=express.Router();
postRoute.route('/post').post(controller.userPostController);

module.exports=postRoute;