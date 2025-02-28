var express = require('express');
const MyUser = require('../models/User');
var router = express.Router();
const bodyParser = require('body-parser');
const Seller = require('../models/Seller');
const Admin = require('../models/Admin');
const app = express();

app.use(bodyParser.json());
app.use(express.json());

router.post('/verifyotp', async function(req,res,next ) {
    const { email, otp, role } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required.' });
    }
    
    if(role === "USER"){
        const user = await MyUser.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        if (user.otp !== parseInt(otp, 10) || user.otpExpiresAt < Date.now()) {
            return res.status(400).json({ error: 'Invalid or expired OTP.' });
        }
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        await user.save();
    
        res.status(200).json({ status: true , message: 'User verified successfully!' , data : user});
    }else if (role === "ADMIN"){
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found.' });
        }
        if (admin.otp !== parseInt(otp, 10) || admin.otpExpiresAt < Date.now()) {
            return res.status(400).json({ error: 'Invalid or expired OTP.' });
        }
        admin.isVerified = true;
        admin.otp = undefined;
        admin.otpExpiresAt = undefined;
        await admin.save();
    
        res.status(200).json({ status: true , message: 'Admin verified successfully!' , data:admin});
    }else{
        const seller = await Seller.findOne({ email });
        if (!seller) {
            return res.status(404).json({ error: 'Business not found.' });
        }
        if (seller.otp !== parseInt(otp, 10) || seller.otpExpiresAt < Date.now()) {
            return res.status(400).json({ error: 'Invalid or expired OTP.' });
        }
        seller.isVerified = true;
        seller.otp = undefined;
        seller.otpExpiresAt = undefined;
        await seller.save();
    
        res.status(200).json({ status: true , message: 'Business man verified successfully!', data:seller });
    }


   

   
});
module.exports= router;