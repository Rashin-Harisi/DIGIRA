var express = require('express');
const MyUser = require('../models/User');
var router = express.Router();

/* GET users listing. 
router.get('/', async function(req, res, next) {
  try {
    const users = await MyUser.find({});
    res.render("users", {
      users: users,
    });
  } catch (err) {
    res.status(500).send('Error retrieving users');
  }
});
*/
router.get('/', async function(req, res, next) {
  try {
    const users = await MyUser.find({});
    res.json(users);  // Sends users data as JSON for frontend consumption
  } catch (err) {
    res.status(500).send('Error retrieving users');
  }
});

module.exports = router;
