var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const Product = require("../models/Product");
const app = express();

app.use(bodyParser.json());
app.use(express.json());

router.post("/approveProduct", async function (req, res, next) {
    const {productId,status} = req.body

    const product = await Product.findOne({productId})
    product.status = status;
    await product.save()
    res.status(200).json({status:true, message: 'Product is approved'})
});

module.exports= router;
