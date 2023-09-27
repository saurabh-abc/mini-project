const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  token: {
    type: String,
  },
  isAdmin: {
    type: Number,
    enum: [0, 1],
    default: 1,
  },
  password: {
    type: String,
    require: true,
  },
  signupDate: {
    type: Date,
    default: Date.now,
    format: "YYYY-MM-DD"
  },
});
module.exports = mongoose.model("userModel", userSchema);
