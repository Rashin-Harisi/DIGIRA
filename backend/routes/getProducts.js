var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const Product = require('../models/Product');
const app = express();

app.use(bodyParser.json());
app.use(express.json());


router.get('/',async function(req,res,next){
    try {
        const products = await Product.find({});
        if(!products){
            res.json({success: false, message : "There is no Products yet!"});
        }else{
            res.json({success: true, data : products});
        }
         
      } catch (err) {
        res.status(500).send('Error retrieving products');
      }
})

module.exports= router