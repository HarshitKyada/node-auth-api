// models/Cart.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: String,
  items: [
    {
      id: { type: Number },
      name: { type: String },
      description: { type: String },
      price: { type: Number },
      rating: { type: Number },
      imageUrl: { type: String },
    },
  ],
});

const Cart = mongoose.model("Cart", userSchema); // Make sure the model name is 'Cart'
module.exports = Cart;
