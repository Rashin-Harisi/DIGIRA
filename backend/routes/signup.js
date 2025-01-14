var express = require('express');
const MyUser = require('../models/User');
var router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const { hash } = require('bcrypt');
const { sendVerificationEmail } = require('../utils/sendEmail');


app.use(bodyParser.json());

router.post('/signup',async function(req,res,next){
    const { name, username, email, password, phone } = req.body;

    const hashedPass = await hash(password,12);

    if (!name || !username || !email || !password || !phone) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const existingUser = await MyUser.findOne({email : {$eq: email}})
    if(existingUser){
        return res.status(400).json({ error: 'The user is already existed!' });
    }

    const otp = Math.floor(Math.random() * 1000000);
    const expireTime_otp = Date.now() + 5 * 60 * 1000;
    
    var user = new MyUser;
    user.name = name;
    user.username = username;
    user.email = email;
    user.phone = phone;
    user.password = hashedPass;
    user.otp = otp;
    user.otpExpiresAt = expireTime_otp;
    user.isVerified= false;
    
    const emailSent = await sendVerificationEmail(email,otp);
    console.log("email",emailSent)

    if (!emailSent) {
        return res.status(500).json({ error: 'Failed to send verification email.' });
    }

    await user.save();

    res.status(200).json({ message: 'Verification code sent to your email.' });
    
   
})

module.exports= router;