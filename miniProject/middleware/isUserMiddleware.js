const userModel = require('../models/userRegisterModel');
const  isUser= async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);
      if (user.isAdmin == 1) {
        return res.status(401).send({
          success: false,
          message: "Admin is not allowed to create post",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in user middleware",
      });
    }
  };

module.exports = isUser;
