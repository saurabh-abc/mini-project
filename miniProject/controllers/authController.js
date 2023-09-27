const userModel = require("../models/userRegisterModel");
const JWT = require("jsonwebtoken");
const {
  hashPassword,
  comparePassword,
} = require("../helpers/pswrdEncodeHelper");
const sendingMail = require('../helpers/sendMailHelper');
const authAPis = {
  register: async (req, res) => {
    try {
      const { name, email, gender, age, password } = req.body;
      if (!name) {
        return res.send({ message: "Name is Required" });
      }
      if (!email) {
        return res.send({ message: "email is Required" });
      }
      if (!gender) {
        return res.send({ message: "gender is Required" });
      }
      if (!age) {
        return res.send({ message: "age is Required" });
      }
      if (!password) {
        return res.send({ message: "password is Required" });
      }

      const exixstingUser = await userModel.findOne({ email });
      if (exixstingUser) {
        return res.status(200).send({
          success: false,
          message: "Already Register Please Login",
        });
      }
      const hashedPassword = await hashPassword(password);
      const user = await new userModel({
        name,
        email,
        gender,
        age,
        password: hashedPassword,
      }).save();
      res.status(201).send({
        success: true,
        message: "User Register succesfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Registration",
        error,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid mail and password",
        });
      }
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Email is not regiseterd",
        });
      }
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid password",
        });
      }
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      console.log(user.email);
      await userModel.findOneAndUpdate(
        { email: user.email },
        { $set: { token: token } },
        { new: true }
      ),
        res.status(200).send({
          success: true,
          message: "login succesfully",
          user: {
            name: user.name,
            email: user.email,
            gender: user.gender,
            age: user.age,
          },
          token,
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Login",
        error,
      });
    }
  },
  forgotPassword: async (req, res) => {
    const email = req.body.email;
    const ExistUser = await userModel.findOne({ email: email });
    if (!ExistUser) {
      return res.status(404).send({
        success: false,
        message: "User Not Registered",
      });
    }
    const secret = process.env.JWT_SECRET + ExistUser.password;
    const payload = {
      email: ExistUser.email,
      id: ExistUser._id,
    };
    const id = ExistUser._id;
    const token = JWT.sign(payload, secret, { expiresIn: "15min" });
    const link = `http://localhost:3001/api/v1/auth/reset-password/${id}/${token}`;
         await sendingMail(link,ExistUser.email);
    return res.status(200).send({
      success: true,
      message: "Password resest link has beeb sent to your gmail....",
    });
  },
  resetPassword: async (req, res) => {
    const { id, token } = req.params;
    const ExistUser = await userModel.findOne({ _id: id });
    if (ExistUser == null) {
      res.send("Invalid user");
    }
    const secret = process.env.JWT_SECRET + ExistUser.password;
    try {
      const payload = JWT.verify(token, secret);
      res.render("reset-password", { email: ExistUser.email });
    } catch (error) {
      console.log(error.message);
      res.send(error.message);
    }
  },
  changePassword:async(req,res)=>{
    const { id, token } = req.params;
    const {password,password2} = req.body;
    const ExistUser = await userModel.findOne({ _id: id });
    if (ExistUser == null) {
      res.send("Invalid user");
    }
    const secret = process.env.JWT_SECRET + ExistUser.password;
    try {
      const payload = JWT.verify(token, secret);
      if(password !== password2){
        res.send("Both Password should be matched");
      }
      const hashedPassword = await hashPassword(password);
      await userModel.findOneAndUpdate(
        { email: ExistUser.email },
        { $set: { password: hashedPassword } },
      ),
      ExistUser.password = hashedPassword;
      res.send(ExistUser);
    } catch (error) {
      console.log(error.message);
      res.send(error.message);
    }

  }
};
module.exports = authAPis;
