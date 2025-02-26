var express = require("express");
const MyUser = require("../models/User");
const Seller = require("../models/Seller");
var router = express.Router();
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());

router.patch("/editPersonalInfo", async function (req, res, next) {
  const { userId, editedData } = req.body;
  const user = await MyUser.findOne({ _id: userId });
  const seller = await Seller.findOne({ _id: userId });
  try {
    if (user) {
      user.addresses = editedData.addresses;
      user.name = editedData.name;
      user.username = editedData.username;
      user.phone = editedData.phone;
      await user.save();
    }
    if (seller) {
      seller.addresses = editedData.addresses;
      seller.name = editedData.name;
      seller.username = editedData.username;
      seller.phone = editedData.phone;
      await seller.save();
    }
    res
      .status(200)
      .json({
        status: true,
        message: "Personal Info were edited successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to handle user's personal info editing process." });
  }
});

module.exports = router;
