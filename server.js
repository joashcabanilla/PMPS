const express = require('express');
const sendEmail = require('./function/sendemail');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const publicdir = path.join(__dirname,'/public');

//middleware
app.use(express.static(publicdir)); 
app.use(cors());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'public/views','index.html'));
});

app.post('/api/sendemail',(req, res) => {
    const {adminmail,adminpassword,email, subject, message} = req.body;
    sendEmail(adminmail,adminpassword,email, subject, message);
    res.status(200);
});

app.listen(port, () => {
console.log(`server running at port ${port}`);
});

