const express = require("express");
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const authRoute = require("./routes/authRoute");
const path = require('path');
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoutes");
const chatRoute = require("./routes/chatRoute");
const facaebookRoute = require('./routes/facebookRoute');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
const db = require("./config/db");
require("dotenv").config();
const port = process.env.PORT || 3600;
app.use(cors());
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/facebook", facaebookRoute);
app.get('/simpleChat',(req,res)=>{
  res.render('index.html')
})
const server=app.listen(port, () => {
  console.log(`server is listen on ${port}`);
});

app.use(session({
  resave:false,
  saveUninitialized:true,
  secret:'SECRET'
}))
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user,cb){
  cb(null,user);
})

passport.deserializeUser(function(obj,cb){
  cb(null,obj);
})

passport.use(new FacebookStrategy({
  clientID:process.env.FACEBOOK_CLIENT_ID,
  clientSecret:process.env.FACEBOOK_SECRET_KEY,
  callbackURL:process.env.FACEBOOK_CALLBACK_URL
},
function (accessToken,refreshToken,profile,done){
  return done(null,profile);
}
))
//socket
const io = require('socket.io')(server)
app.use(express.static(path.join(__dirname, 'public')));
io.on('connection', onConnected)
function onConnected(socket) {
  console.log('Socket connected', socket.id)
  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id)
  })
  socket.on('message', (data) => {
    socket.broadcast.emit('chat-message', data)
  })
}