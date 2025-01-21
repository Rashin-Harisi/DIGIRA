var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const Product = require("../models/Product");
const app = express();

app.use(bodyParser.json());
app.use(express.json());

router.post("/submitProduct", async function (req, res, next) {
    const {sellerId,name,company,price,discount,images,quantity,colors,details} = req.body

    if(!sellerId ||!name||!company||!price||!images||!quantity){
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const newProduct = new Product;
    newProduct.sellerId = sellerId;
    newProduct.name = name;
    newProduct.company = company;
    newProduct.price = price;
    newProduct.discount = discount || "0";
    newProduct.images = images;
    newProduct.status = "waiting";
    newProduct.quantity = quantity;
    newProduct.colors = colors;
    newProduct.details = details || "";
    

    await newProduct.save()
    res.status(200).json({status:true, message: 'Product is submitted.Please wait until admins approve it.' , data: newProduct})
});

module.exports= router;
