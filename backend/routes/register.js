var express = require('express');
const MyUser = require('../models/User');
var router = express.Router();
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

router.post('/register',async function(req,res,next){
    const { name, username, email, password, phone } = req.body;

    var user = new MyUser;
    user.name = name;
    user.username = username;
    user.email = email;
    user.phone = phone;
    user.password = password;

    if (!name || !username || !email || !password || !phone) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        user.save()
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to register user.' });
    }
    
   
})

module.exports= router;