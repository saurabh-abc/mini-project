const userModel = require("../models/userRegisterModel");
const postModel = require("../models/userPostModel");
const postApis = {
  getProfile: async (req, res) => {
    try {
      const userData = await userModel.find({ _id: req.user._id });
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  },
  createPost: async (req, res) => {
    try {
      const { title, post } = req.body;
      const userId = req.user._id;
      const postData = await postModel({
        userId,
        title,
        post,
      }).save();
      res.send(postData);
    } catch (error) {
      res.send(error);
    }
  },
  seeOthersPost:async(req,res)=>{
    const userId =req.user._id;
    try {
    const postData = await postModel.find( { userId: { $nin: [userId] } } )
    res.send(postData);
    } catch (error) {
      res.send(error);
    }
  }
};
module.exports = postApis;
