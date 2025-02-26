var express = require("express");
const MyUser = require("../models/User");
const Seller = require("../models/Seller");
var router = express.Router();
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());

router.patch("/removeAddress", async function (req, res, next) {
  const { userId, index, address } = req.body;
  const user = await MyUser.findOne({ _id: userId });
  const seller = await Seller.findOne({ _id: userId });
  try {
    if (user) {
      user.addresses.splice(index, 1);
      await user.save();
    }
    if (seller) {
      seller.addresses.splice(index, 1);
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
    return res.status(500).json({ error: "Failed to handle user's address removing process." });
  }
});

module.exports = router;
