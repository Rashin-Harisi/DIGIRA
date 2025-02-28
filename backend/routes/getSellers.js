var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const Seller = require('../models/Seller')
const app = express();

app.use(bodyParser.json());
app.use(express.json());


router.get('/',async function(req,res,next){
    try {
        const sellers = await Seller.find({});
        
        if(!sellers){
            res.json({success: false, message : "There is no Seller yet!"});
        }else{
            res.json({success: true, data : sellers});
        }
         
      } catch (err) {
        res.status(500).send('Error retrieving sellers');
      }
})

module.exports= router