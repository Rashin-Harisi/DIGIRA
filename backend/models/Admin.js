var db = require("../lib/db");

const AdminSchema = new db.Schema(
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
      unique: true,
      required: true,
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
      default: "ADMIN"
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
    otp: { type: Number },
    otpExpiresAt: { type: Date },
    isVerified: { type: Boolean, default: false },
  },
  { versionKey: false }
);

var Admin = db.mongoose1.model("Admin", AdminSchema);

module.exports = Admin;
