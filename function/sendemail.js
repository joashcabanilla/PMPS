const nodemailer = require('nodemailer');

const sendEmail = (adminmail,adminpassword,email, subject, message) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: adminmail,
            pass: adminpassword
        }
    });
    let mailOptions = {
        from: adminmail,
        to: email,
        subject: subject,
        text: message
    };
    
    transporter.sendMail(mailOptions, (err,data) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("email sent");
    }
    });
}

module.exports = sendEmail;