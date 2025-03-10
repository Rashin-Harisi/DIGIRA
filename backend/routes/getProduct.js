var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const Product = require('../models/Product');
const app = express();

app.use(bodyParser.json());
app.use(express.json());


router.post('/getProduct',async function(req,res,next){
    const {id} = req.body
    //console.log(id)
    try {
        const product = await Product.findOne({_id : id});
        //console.log(product)
        if(!product){
            res.json({success: false, message : "The product was not found!"});
        }else{
            res.json({success: true, data : product});
        }
         
      } catch (err) {
        res.status(500).send('Error retrieving products');
      }
})

module.exports= router