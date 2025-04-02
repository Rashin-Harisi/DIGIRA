var express = require("express");
const MyUser = require("../models/User");
const Seller = require("../models/Seller");
const Admin = require("../models/Admin");
var router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const { sendVerificationEmail } = require("../utils/sendEmail");
const { hash } = require('bcrypt');

app.use(bodyParser.json());
app.use(express.json());

const otp_origin = Math.floor(Math.random() * 1000000);

router.post("/passwordRecovery", async function (req, res, next) {
  const { email } = req.body;
  
  console.log("otp in post request",otp_origin)
  try {
    const isUser = await MyUser.findOne({ email });
    const isSeller = await Seller.findOne({ email });
    const isAdmin = await Admin.findOne({ email });
   
    if (!isUser && !isSeller && !isAdmin) {
      return res
        .status(400)
        .json({ message: "The email address is not exist in our list." });
    }
    const emailSent = await sendVerificationEmail(email, otp_origin);
    if (!emailSent) {
        return res.status(500).json({ message: 'Failed to send verification email.' });
    }
    res.status(200).json({success:true, message: 'Verification code sent to your email.'})

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to send verification code process." });
  }
});


router.patch("/passwordRecovery", async function (req, res, next) {
    const {email,newPass,otp} = req.body
    const hashedPass = await hash(newPass,12);
    console.log("otp in patch request",otp_origin)
  try {
    if(otp_origin !== Number(otp)){
        console.log("ALARM",typeof otp_origin, typeof otp)
        return res.status(500).json({ message: 'The otp code is not valid.' });
    }
    const isUser = await MyUser.findOne({ email });
    const isSeller = await Seller.findOne({ email });
    const isAdmin = await Admin.findOne({ email });
    if(isUser){
        isUser.password = hashedPass;
        isUser.save();
    }else if(isSeller){
        isSeller.password = hashedPass;
        isSeller.save();
    }else{
        isAdmin.password = hashedPass;
        isAdmin.save();
    }
    res.status(200).json({success:true, message: 'New password is saved. You can now log in with your new password.'})
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to set new password process." });
  }
});

module.exports = router;
