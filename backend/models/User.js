var db = require("../lib/db");

const PaymentSchema = new db.Schema(
  {
    userId: {
      type: db.Schema.Types.ObjectId,
      ref: "UserSchema",
    },
    date: { type: Date },
    time: { type: Date },
    amount: { type: Number },
    status: { type: String },
  },
  { versionKey: false }
);

const UserSchema = new db.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
    role: {
      type: String,
      default: "USER"
    },
    addresses: [
      {
        country: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        street: { type: String, required: true },
        number: { type: Number, required: true },
        postalCode: { type: Number, required: true },
      },
    ],
    orders: [],
    payments: [PaymentSchema],
    otp: { type: Number },
    otpExpiresAt: { type: Date },
    isVerified: { type: Boolean, default: false },
  },
  { versionKey: false }
);

var MyUser = db.mongoose1.model("User", UserSchema);

module.exports = MyUser;
