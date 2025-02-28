var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('regform')
})

module.exports= router