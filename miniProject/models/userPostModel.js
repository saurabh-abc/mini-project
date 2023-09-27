const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    title: {
      type: String,
      enum: ["songs", "sports", "jokes"],
      require: true,
    },
    post: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("postModel", postSchema);
