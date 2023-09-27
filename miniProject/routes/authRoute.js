const express = require('express');
const authRoute = express.Router();
const authController = require('../controllers/authController');
authRoute.post('/register',authController.register);
authRoute.post('/login',authController.login);
authRoute.post('/forgot-password',authController.forgotPassword);
authRoute.get('/reset-password/:id/:token',authController.resetPassword);
authRoute.post('/reset-password/:id/:token',authController.changePassword);
module.exports = authRoute;