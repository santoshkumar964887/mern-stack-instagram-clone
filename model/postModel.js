const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  postedBy: {
    type: ObjectId,
    ref: "users",
  },
});
module.exports = mongoose.model("posts", schema);
