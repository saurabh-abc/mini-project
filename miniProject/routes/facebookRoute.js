const passport  = require('passport');
const express = require('express');
const requireSignIn = require('../middleware/authMiddleware');
var facaebookRoute = express.Router();
facaebookRoute.get('/auth',function(req,res){
    res.render('index.ejs');
})
facaebookRoute.get('/profile',requireSignIn,function(req,res){
    res.render('profile.ejs',{
        user:req.user
    });

})

facaebookRoute.get('/callback',passport.authenticate('facebook',{
    scope:['public_profile','email']
}))
module.exports = facaebookRoute;