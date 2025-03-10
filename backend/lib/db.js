var mongoose1 = require('mongoose');
var Schema = mongoose1.Schema;


const connectDB = async () => {
    const uriAWS = "mongodb://16.171.199.82:27017/mydatabase";
    const uriLocal = "mongodb://192.168.0.94:27017/mydatabase";


    try {
        await mongoose1.connect(uriAWS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Exit process with failure
    }
};

const disconnectDB = ()=>{
    mongoose1.disconnect
}

module.exports= disconnectDB;
module.exports = connectDB;
module.exports.mongoose1 = mongoose1;
module.exports.Schema = Schema;