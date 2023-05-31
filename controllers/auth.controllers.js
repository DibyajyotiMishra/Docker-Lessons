const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      password: hashedPassword,
    });
    req.session.user = user;
    return res.status(201).json({
      status: "success",
      "session-id": req.session.id,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        error: "User not found.",
      });
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      return res.status(422).json({
        status: "fail",
        error: "Password doesnot match.",
      });
    } else {
      req.session.user = user;
      return res.status(201).json({
        status: "success",
        "session-id": req.session.id,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};
