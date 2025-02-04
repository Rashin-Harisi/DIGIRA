var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const Product = require("../models/Product");
const app = express();

app.use(bodyParser.json());
app.use(express.json());

router.post("/approveProduct", async function (req, res, next) {
  
  const { productId, status, note } = req.body;
  try {
    const product = await Product.findOne({_id:productId})
    if(status === "approved"){
        product.status = status;
        await product.save()
        res.status(200).json({status:true, message: 'Product is approved'})
    }else if(status === "declined"){
        product.status = status;
        product.note = note
        await product.save()
        res.status(200).json({status:true, message : "Product is declined."})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Something went wrong in approve process."})
  }
});

module.exports = router;
