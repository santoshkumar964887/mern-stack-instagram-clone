const mongoose=require('mongoose');
const { schema } = require('./userModel');
const schema= new mongoose.Schema({
  title:{
      type:String,
      required:true
  },
  body:{
      type:String,
      required:true
  },
  image:{
    type:String,
    default:"no image"
  },
  postedBy:{
      type:ObjectId,
      ref:user

  }
});
module.exports=mongoose.model("posts",schema)