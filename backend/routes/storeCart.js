var express = require("express");
const MyUser = require("../models/User");
var router = express.Router();
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());

router.patch("/storeCart", async function (req, res, next) {
    const purchaseData = req.body;
    const userEmail = purchaseData.userEmail
    console.log("userEmail",userEmail)
  try{
    const user = await MyUser.findOne({email : userEmail})
    console.log("user",user)
    if(!user){
        res.json({success: false, message : "The User cannot be found"});
    }
    user.orders.push(purchaseData)
    await user.save()
    res
      .status(200)
      .json({
        status: true,
        message: "The new order saved in the database successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to store new order details." });
  }
});

module.exports = router;