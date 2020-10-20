exports.userPostController = (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res
      .status(422)
      .json({ status: "fail", message: "please fill all the fields" });
  }
};
