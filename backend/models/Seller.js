var db = require("../lib/db");

const Receive_Payment_Schema = new db.Schema(
  {
    userId: {
      type: db.Schema.Types.ObjectId,
      ref: "SellerSchema",
    },
    date: { type: Date },
    time: { type: Date },
    amount: { type: Number },
    status: { type: String },
  },
  { versionKey: false }
);

const SellerSchema = new db.Schema({
	username: {
		type: String,
		unique: true,
		required :true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	phone: {
		type: Number,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required : true,
	},
	createdAt: {
		type: Date,
		default: ()=> Date.now(),
		immutable: true,
	},
	role: {
		type: String,
		default: "BUSINESS_MAN",
	},
	business_number: {
		type: Number,
		unique: true,
		required : true,
	},
	address: {
        type: String,
        required:true,
    },
	receive_payments: [Receive_Payment_Schema],
    otp: { type: Number },
    otpExpiresAt: { type: Date },
    isVerified: { type: Boolean, default: false },
},{ versionKey: false })

var Seller = db.mongoose1.model("Seller", SellerSchema);

module.exports = Seller;