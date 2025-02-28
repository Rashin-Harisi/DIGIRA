const AWS = require('aws-sdk');
const fs = require("fs");

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'eu-north-1' 
});

const s3 = new AWS.S3();


const uploadFileToS3 = async (file, bucketName) => {
    const fileContent = fs.readFileSync(file.path); 
    const params = {
      Bucket: bucketName,
      Key: `${Date.now()}_${file.originalname}`,
      Body: fileContent,
      ContentType: file.mimetype, 
    };
  
    try {
      const uploadResult = await s3.upload(params).promise();
      return uploadResult.Location; 
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw error;
    }
  };
  

  module.exports = {uploadFileToS3}