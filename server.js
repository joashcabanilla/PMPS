const express = require('express');
const sendEmail = require('./function/sendemail');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const publicdir = path.join(__dirname,'public');

//middleware
app.use(express.static(publicdir)); 
app.use(cors());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(session({
    name: 'sid',
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
}));
app.use((req, res, next) =>  { 
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'); 
    next(); 
});

const redirectLogin = (req, res, next) => {
    if(!req.session.login){
        res.redirect('/');
    }
    else{
        next();
    }
}

const alreadylogin = (req, res, next) => {
    if(req.session.login == "staff"){
        res.redirect('/staff');
    }
    else if(req.session.login == "admin"){
        res.redirect('/admin');
    }
    else{
        next();
    }
}

//route--------------------------------------------------------------------------------------
app.get('/', alreadylogin, (req,res) => {   
    res.sendFile(path.join(__dirname,'public/views','index.html'));
});

app.get('/admin', redirectLogin, (req,res) => {
    if(req.session.login == "staff"){
        res.redirect('/staff');
    }
    else{
        res.sendFile(path.join(__dirname,'public/views','admin.html'));
    }
});

app.get('/staff', redirectLogin, (req,res) => {
    if(req.session.login == "admin"){
        res.redirect('/admin');
    }
    else{
        res.sendFile(path.join(__dirname,'public/views','staff.html'));
    }
});

//API----------------------------------------------------------------------------------------
app.post('/api/sendemail',(req, res) => {
    const {adminmail,email, subject, message,clientID,clientSecret,refreshToken} = req.body;
    sendEmail(adminmail,email, subject, message,clientID,clientSecret,refreshToken);
    res.status(200);
});

app.post('/api/stafflogin', (req, res) => {
    const {login} = req.body;
    req.session.login = login;
    res.json(req.session);
});

app.post('/api/adminlogin', (req, res) => {
    const {login} = req.body;
    req.session.login = login;
    res.json(req.session);
});

app.post('/api/logout', (req, res) => {
    res.json(req.session.destroy());
});
app.listen(port, () => {
console.log(`server running at port ${port}`);
});

