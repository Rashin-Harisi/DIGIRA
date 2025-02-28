var express = require("express");
var router = express.Router();
require("dotenv").config();
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(express.json());

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  //console.log("authHeader", authHeader);
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  try {
    const token = authHeader.split(" ")[1];
    //console.log("JWT_SECRET:", process.env.JWT_SECRET);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }
      req.user = decoded; 
      //console.log("req.user",req.user);
      next(); 
    });
  } catch (error) {
        console.error("JWT Error:", err); 
  }
};

router.post("/userProfile", verifyToken, (req, res) => {
  res.json({
    userId: req.user.id,
    email: req.user.email,
  });
});

module.exports = router;
