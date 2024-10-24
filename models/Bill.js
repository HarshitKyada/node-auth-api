// models/Bill.js

const mongoose = require("mongoose");

// Define the schema
const billSchema = new mongoose.Schema({
  token: { type: String },
  email: { type: String },
  product: [
    {
      productName: { type: String },
      productPrice: { type: mongoose.Schema.Types.Mixed }, // Allow both Number and String
      productcount: { type: mongoose.Schema.Types.Mixed }, // Allow both Number and String
    },
  ],
  address: {
    username: { type: String },
    phonenumber: { type: mongoose.Schema.Types.Mixed }, // Allow both Number and String
    city: { type: String },
    pincode: { type: String },
    state: { type: String },
    fulladdress: { type: String },
  },
  totalPrice: { type: mongoose.Schema.Types.Mixed }, // Allow both Number and String
  gst: { type: mongoose.Schema.Types.Mixed }, // Allow both Number and String
  shippingCharge: { type: mongoose.Schema.Types.Mixed }, // Allow both Number and String
  totalBill: { type: mongoose.Schema.Types.Mixed }, // Allow both Number and String
});

// Use mongoose.models to prevent overwriting the model
const Bill = mongoose.models.Bill || mongoose.model("Bill", billSchema);

module.exports = Bill;
