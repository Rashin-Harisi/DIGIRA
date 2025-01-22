var express = require('express');
const MyUser = require('../models/User');
const Admin = require('../models/Admin');
const Seller = require('../models/Seller');
var router = express.Router();
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(express.json());


router.post('/getUser', async function(req, res, next) {
  const {email} = req.body;
  var details;
  try {
    const user = await MyUser.findOne({email});
    const admin= await Admin.findOne({email});
    const seller = await Seller.findOne({email})

    if(user){
      details = user
    }else if(admin){
      details = admin
    }else if (seller){
      details = seller
    }else{
      return res.status(500).send('Error retrieving email address');
    }
    //console.log(details);
    return res.status(200).json({success:true, data : details})
  } catch (err) {
    return res.status(500).send('Error retrieving users');
  }
});

module.exports = router;
