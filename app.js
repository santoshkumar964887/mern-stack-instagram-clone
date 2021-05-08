const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userAuthRouter = require("./router/userAuthRoute.js");
const userPostRouter = require("./router/userPostsRoute");
const cors = require("cors");
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => console.log(`Data Base Connected`))
  .catch((error) => console.log(error));
//   mongoose.connection.on('connected',()=>{
//       console.log("data base connected");
//   });
//   mongoose.connection.on('error',(err)=>{
//       console.log(err);
//   })
app.use("/api/v1", userAuthRouter);
app.use("/api/v1", userPostRouter);
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
