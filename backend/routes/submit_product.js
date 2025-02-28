var express = require("express");
var router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const { uploadFileToS3 } = require("../utils/s3");
const upload = multer({ dest: "../uploads/" });


router.post(  "/submitProduct", upload.array('images[]') , async function (req, res, next) {
  try {
    const images = req.files;
      const {sellerId,name,company,price,discount,quantity,colors,details} = req.body;
      

      const bucketName = "fullstack-online-shop"
      const uploadedUrls = await Promise.all(
        images.map(async (file) => {
          const url = await uploadFileToS3(file, bucketName);
          return url;
        })
      );
  
      

      if (!sellerId || !name || !company || !price || !quantity) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const newProduct = new Product();
      newProduct.sellerId = sellerId;
      newProduct.name = name;
      newProduct.company = company;
      newProduct.price = price;
      newProduct.discount = discount || "0";
      newProduct.status = "waiting";
      newProduct.storage_quantity = quantity;
      newProduct.colors = colors;
      newProduct.details = details || "";
      newProduct.images = uploadedUrls;

      await newProduct.save()
      res.status(200).json({
        status: true,
        message: "Product is submitted.Please wait until admins approve it.",
        data: newProduct
      });
    } catch (error) {
      console.log(error)
    }
      }
      
    
);

module.exports = router;
