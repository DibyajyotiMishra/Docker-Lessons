const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: [true, "Every user should have a user-name"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Every user should have a password"],
  },
});

const user = mongoose.model("User", userSchema);

module.exports = user;
