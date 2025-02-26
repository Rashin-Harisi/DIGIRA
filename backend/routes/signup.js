var express = require('express');
const MyUser = require('../models/User');
var router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const { hash } = require('bcrypt');
const { sendVerificationEmail } = require('../utils/sendEmail');
const Admin = require('../models/Admin');
const Seller = require('../models/Seller');
const { generateToken } = require('../utils/jwt');


app.use(bodyParser.json());
app.use(express.json());

router.post('/signup',async function(req,res,next){
    //later add address
    const { name, username, email, password, phone, role,business_number } = req.body;

    const hashedPass = await hash(password,12);

    if (!name || !username || !email || !password || !phone) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const otp = Math.floor(Math.random() * 1000000);
    const expireTime_otp = Date.now() + 5 * 60 * 1000;

    const existingUser = await MyUser.findOne({email : {$eq: email}})
    const existingAdmin = await Admin.findOne({email : {$eq: email}})
    const existingSeller = await Seller.findOne({email : {$eq: email}})
    if(existingSeller || existingAdmin || existingUser){
        return res.status(400).json({ error: 'The email address is already registered!' });
    }

    if(role === "USER"){
        var user = new MyUser;
        user.role = "USER"
        user.name = name;
        user.username = username;
        user.email = email;
        user.phone = phone;
        user.password = hashedPass;
        user.otp = otp;
        user.otpExpiresAt = expireTime_otp;
        user.isVerified= false;

    }else if(role === "ADMIN"){
        var admin= new Admin;
        admin.role = "ADMIN"
        admin.name = name;
        admin.username = username;
        admin.email = email;
        admin.phone = phone;
        admin.password = hashedPass;
        admin.otp = otp;
        admin.otpExpiresAt = expireTime_otp;
        admin.isVerified= false;

    }else{
        var seller = new Seller;
        seller.role = "BUSINESS_MAN"
        seller.name = name;
        seller.username = username;
        seller.email = email;
        seller.phone = phone;
        seller.business_number = business_number;
        //seller.address = address;
        seller.password = hashedPass;
        seller.otp = otp;
        seller.otpExpiresAt = expireTime_otp;
        seller.isVerified= false;
    }
    
    const emailSent = await sendVerificationEmail(email,otp);
    console.log("email",emailSent)

    if (!emailSent) {
        return res.status(500).json({ error: 'Failed to send verification email.' });
    }

    if(role === "USER"){
        await user.save();
        const token = generateToken(user)
        res.status(200).json({status:true, message: 'Verification code sent to your email.' , data: user, token: token})
    }else if(role === "ADMIN"){
        await admin.save()
        const token = generateToken(admin)
        res.status(200).json({status:true, message: 'Verification code sent to your email.', data : admin, token:token })
    }else{
        await seller.save()
        const token = generateToken(seller)
        res.status(200).json({status:true, message: 'Verification code sent to your email.', data: seller, token: token });   
    }
})

module.exports= router;