var express = require("express");
const Product = require("../models/Product");
var router = express.Router();
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());

router.post("/likeHandle", async function (req, res, next) {
  const { userId, status, productId } = req.body;
  
  const product = await Product.findOne({ _id: productId });
  const result = product.stars.includes(userId);
 
  try {
    if (!result && status === "liked") {
        product.stars.push(userId);
        await product.save();
      res
        .status(200)
        .json({ status: true, message: "Product is liked successfully." });
    }
    if (result && status === "unLiked") {
        const index = product.stars.indexOf(userId);
        if(index!== -1){
            product.stars.splice(index,1)
          }
        await product.save();
      res
        .status(200)
        .json({ status: true, message: "Product is unLiked successfully." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to handle user's like." });
  }
});

module.exports = router;
