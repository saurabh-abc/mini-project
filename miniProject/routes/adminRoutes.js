const express = require('express');
const requireSignIn = require('../middleware/authMiddleware');
const adminRoute = express.Router();
const adminController = require('../controllers/adminController');
adminRoute.post('/allUserByName',requireSignIn,adminController.allUserByName);
adminRoute.post('/allUserByDate',requireSignIn,adminController.allUserByDate);
module.exports = adminRoute;