var express = require('express');
const MyUser = require('../models/User');
var router = express.Router();



router.post('/verifyotp', async function(req,res,next ) {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required.' });
    }

    const user = await MyUser.findOne({ email });

    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    // Check if the OTP matches and hasn't expired
    if (user.otp !== parseInt(otp, 10) || user.otpExpiresAt < Date.now()) {
        return res.status(400).json({ error: 'Invalid or expired OTP.' });
    }

    // Mark the user as verified and remove the OTP fields
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    res.status(200).json({ status: "success" , message: 'User verified successfully!' });
});
module.exports= router;