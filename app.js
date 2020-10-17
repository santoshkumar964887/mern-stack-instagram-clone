import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userAuthRouter from './router/userAuthRoute.js';
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => console.log(`Data Base Connected${con}`))
  .catch((error) => console.log(error));
//   mongoose.connection.on('connected',()=>{
//       console.log("data base connected");
//   });
//   mongoose.connection.on('error',(err)=>{
//       console.log(err);
//   })
app.use('/api/v1',userAuthRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
