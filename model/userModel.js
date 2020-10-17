import mongoose from 'mongoose';
const schema= mongoose.Schema({
      name:{
          type:String,
          required:true
      },
      email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});
const model= mongoose.model('users',schema);
export default model;