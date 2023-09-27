const nodemailer = require('nodemailer');
const sendingMail = async(link,email)=>{
    console.log(link,email);
    let mailTransporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"saurabhdhankar58@gmail.com",
            pass:"****"
        }
    })
    
    let details = {
        from:"saurabhdhankar58@gmail.com",
        to:email,
        subject:"Reset Password Link",
        text:link
    }
    
    mailTransporter.sendMail(details,(err)=>{
        if(err){
            console.log("It has an error",err);
        }else{
            console.log("email has sent");
        }
    })
}
module.exports = sendingMail;
