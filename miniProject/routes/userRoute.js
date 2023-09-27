const express = require('express');
const requireSignIn = require('../middleware/authMiddleware');
const isUser = require('../middleware/isUserMiddleware');
const userRoute = express.Router();
const userController = require('../controllers/userController');
userRoute.get('/getProfile',requireSignIn,userController.getProfile);
userRoute.get('/getProfile',requireSignIn,userController.getProfile);
userRoute.post('/createPost',requireSignIn,isUser,userController.createPost);
userRoute.get('/seeOthersPost',requireSignIn,userController.seeOthersPost);

module.exports = userRoute; 