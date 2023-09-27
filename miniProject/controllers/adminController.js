const userModel = require("../models/userRegisterModel");
const adminApis = {
  allUserByName: async (req, res) => {
    try {
      console.log(req.user._id);
      const userData = await userModel.find({ _id: req.user._id });
      const name = req.body.name;
      console.log(userData[0].isAdmin);
      if (userData[0].isAdmin == "1") {
        const allUsers = await userModel.aggregate([
          {
            $match: {
              name: name,
            },
          },
          { $sort: { age: 1 } },
        ]);
        res.send(allUsers);
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
  allUserByDate:async(req,res)=>{
try {
    userModel.aggregate([{
        $match:{
            timsStamp
        }
    }])
} catch (error) {
    console.log(error);
}
  }
};
module.exports = adminApis;
