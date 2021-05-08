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
    const data = await userPostModel
      .find()
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name");
    return res
      .status(200)
      .json({ status: "success", "number of items": data.length, data });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err });
  }
};
exports.getMyPost = (req, res) => {
  userPostModel
    .find({ postedBy: req.user._id })
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
};
exports.likePost = (req, res) => {
  userPostModel
    .findByIdAndUpdate(
      req.body.postID,
      {
        $push: { likes: req.user._id },
      },
      { new: true }
    )
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({
          status: "fail",
          message: err,
        });
      } else {
        return res.status(200).json({ status: "success", data: result });
      }
    });
};
exports.DisLikePost = (req, res) => {
  userPostModel
    .findByIdAndUpdate(
      req.body.postID,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    )
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({
          status: "fail",
          message: err,
        });
      } else {
        return res.status(200).json({ status: "success", data: result });
      }
    });
};

exports.CommentOnPost = (req, res) => {
  let comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };

  userPostModel
    .findByIdAndUpdate(
      req.body.postID,
      {
        $push: { comments: comment },
      },
      { new: true }
    )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({
          status: "fail",
          message: err,
        });
      } else {
        return res.status(200).json({ status: "success", data: result });
      }
    });
};
