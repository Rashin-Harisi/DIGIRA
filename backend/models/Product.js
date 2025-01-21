var db = require("../lib/db");

const ProductSchema = new db.Schema({
	sellerId:{
		type: db.Schema.Types.ObjectId,
		ref: "SellerSchema",
        required: true,
	},
	stars:[{
		type: db.Schema.Types.ObjectId,
		ref: "UserSchema"
	}],
	name: {
		type: String,
		required : true
	},
	company: {
		type: String,
		required : true
	},
	price: {
		type: String,
		required: true
	},
	discount: {
		type: String,
	},
	images: [String],
    colors:[String],
    details:{
        type: String
    },
	status:{
		type: String,
		enum: ["accepted" , "declined", "waiting"]
	},
	storage_quantity: {type: Number}
})



var Product = db.mongoose1.model("Product", ProductSchema);

module.exports = Product;