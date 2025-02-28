var express = require("express");
const MyUser = require("../models/User");
const Seller = require("../models/Seller");
var router = express.Router();
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());

router.post("/addNewAddress", async function (req, res, next) {
  const { userId, new_address } = req.body;
  const user = await MyUser.findOne({ _id: userId });
  const seller = await Seller.findOne({ _id: userId });
  try {
    if (user) {
      user.addresses.push(new_address);
      await user.save();
    }
    if (seller) {
      seller.addresses.push(new_address);
      await seller.save();
    }

    res
      .status(200)
      .json({ status: true, message: "New address was added successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to handle user's new address." });
  }
});

module.exports = router;
