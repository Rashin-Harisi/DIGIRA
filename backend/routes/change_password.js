var express = require("express");
const MyUser = require("../models/User");
const Seller = require("../models/Seller");
const { compare, hash } = require("bcrypt");
var router = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(express.json());

router.patch("/changePassword", async function (req, res, next) {
  const { userId, passwordChanging } = req.body;
  var hashedPass;
  var details;
  const user = await MyUser.findOne({ _id: userId });
  const seller = await Seller.findOne({ _id: userId });
  try {
    if (user) {
      hashedPass = user.password;
      details = user;
    }
    if (seller) {
      hashedPass = seller.password;
      details = seller;
    }
    const isValid = await compare(passwordChanging.currentPassword , hashedPass)
    if(!isValid){
        return res.status(400).json({ status:false , message: 'Current Password is not correct.' });
    }else{
        const newPass = await hash(passwordChanging.newPassword,12)
        if(user){
            user.password = newPass;
            await user.save()
        }
        if(seller){
            seller.password = newPass;
            await seller.save()
        }
    }    
    res
      .status(200)
      .json({
        status: true,
        message: "Password was changed successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to handle user's like." });
  }
});

module.exports = router;
