const express = require('express');
const chatRoute = express.Router();
const chatController = require('../controllers/chatController');
chatRoute.post('/',chatController.chat);
module.exports = chatRoute;