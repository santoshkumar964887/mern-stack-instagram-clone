import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const app = express();
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => console.log(`Data Base Connected${con}`)).catch((error)=>console.log(error));
const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
