const mongoose = require("mongoose");
const userModel = require("./userRegisterModel");
var messageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel,
  },
  msg: String,
  type: String,
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Messages", messageSchema);
