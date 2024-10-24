// models/Checkout.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  token: { type: String },
  items: [
    {
      name: { type: String },
      description: { type: String },
      price: { type: Number },
      productcount: { type: Number || String },
      uniqueId: { type: String, unique: true }, // If unique identifier
    },
  ],
  address: [
    {
      username: { type: String },
      phonenumber: { type: Number || String },
      city: { type: String },
      pincode: { type: String }, // Pincode as a string to preserve leading zeros
      state: { type: String },
      fulladdress: { type: String },
    },
  ],
});

const Checkout = mongoose.model("Checkout", userSchema); // Make sure the model name is 'Checkout'
module.exports = Checkout;
