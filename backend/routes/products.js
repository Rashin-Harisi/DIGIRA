var express = require('express');
const Product = require('../models/Product');
var router = express.Router();

router.get('/', async function(req, res, next) {
    try {
      const products = await Product.find({});
      res.json(products);  
    } catch (err) {
      res.status(500).send('Error retrieving users');
    }
  });
  
  module.exports = router;
  