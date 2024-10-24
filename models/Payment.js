// models/Payment.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String },
  data: [
    {
      token: { type: String },
      product: [
        {
          productName: { type: String },
          productPrice: { type: Number || String },
          productcount: { type: Number || String },
        },
      ],
      address: {
        username: { type: String },
        phonenumber: { type: Number || String },
        city: { type: String },
        pincode: { type: String },
        state: { type: String },
        fulladdress: { type: String },
      },
      totalPrice: { type: Number || String },
      gst: { type: Number || String },
      shippingCharge: { type: Number || String },
      totalBill: { type: Number || String },
    },
  ],
});

const Payment = mongoose.model("Payment", userSchema);
module.exports = Payment;
