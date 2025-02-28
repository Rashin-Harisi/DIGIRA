var express = require('express');
const MyUser = require('../models/User');
var router = express.Router();
const bodyParser = require('body-parser');
const Seller = require('../models/Seller');
const Admin = require('../models/Admin');
const { compare } = require('bcrypt');
const { generateToken } = require('../utils/jwt');
const app = express();

app.use(bodyParser.json());
app.use(express.json());

router.post('/signin', async function(req,res,next ) {
    var hashedPass;
    var details;
    const { email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please fill all inputs!' });
    }
    
    const isUser = await MyUser.findOne({email});
    const isSeller = await Seller.findOne({email});
    const isAdmin = await Admin.findOne({email});
    
    if(isUser){
        hashedPass = isUser.password;
        details = isUser;
    }else if (isSeller){
        hashedPass = isSeller.password
        details = isSeller;
    }else if(isAdmin){
        hashedPass = isAdmin.password
        details = isAdmin
    }else {
        return res.status(404).json({ error: 'User not found!' })
    }; 

    const isValidPassword =await compare(password,hashedPass )
    if(!isValidPassword){
        return res.status(400).json({ error: 'Username or Password is not correct.' });
    }

    const token = generateToken(details)
    //console.log(token);

    return res.status(200).json({status: true, message: "user successfully logged in.", data : details, token:token})

   
});
module.exports= router;