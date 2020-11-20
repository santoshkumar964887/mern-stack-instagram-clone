const userPostModel = require("../model/postModel");
//creating new post
exports.userPostController = async (req, res) => {
  const { title, body, pic } = req.body;
  if (!title || !body || !pic) {
    return res
      .status(422)
      .json({ status: "fail", message: "please fill all the fields" });
  }
  req.user.password = undefined;
  try {
    const data = await userPostModel.create({
      title,
      body,
      image: pic,
      postedBy: req.user,
    });
    res.status(201).json({ status: "success", data });
  } catch (err) {
    res.status(500).json({ status: "fail", message: "internal server error" });
  }
};
// fetching all post
exports.getAllPosts = async (req, res) => {
  try {
    const data = await userPostModel.find().populate("postedBy", "_id name");
    return res
      .status(200)
      .json({ status: "success", "number of items": data.length, data });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err });
  }
};
exports.getMyPost = async (req, res) => {
  try {
    Post.find({ postedBy: req.user._id })
      .populate("PostedBy", "_id name")
      .then((data) => {
        return res
          .status(200)
          .json({ status: "success", "number of items": data.length, data });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ status: "fail", message: "internal server error" });
      });
  } catch (err) {
    res.status(500).json({ status: "fail", message: "internal server error" });
  }
};
