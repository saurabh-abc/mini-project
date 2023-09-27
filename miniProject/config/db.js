const mongoose = require('mongoose');
require('dotenv').config()
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(res=>{
    console.log('DB connected');
}).catch(err=>{
    console.log(err);
})