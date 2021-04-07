const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const sendEmail = (adminmail,email, subject, message,clientID,clientSecret,refreshToken) => {
    const redirectURI = 'https://developers.google.com/oauthplayground';
    const oauthclient = new google.auth.OAuth2(clientID, clientSecret, redirectURI);
    oauthclient.setCredentials({refresh_token: refreshToken});

    const accesToken = oauthclient.getAccessToken();
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            type: 'OAuth2',
            user: adminmail,
            clientId: clientID,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            accessToken: accesToken
        }
    });
    let mailOptions = {
        from: `PMPS ADMIN ${adminmail}`,
        to: email,
        subject: subject,
        text: message
    };
    
    transporter.sendMail(mailOptions, (err,data) => {
    if(err){
    }
    else{
    }
    });
}

module.exports = sendEmail;