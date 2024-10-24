// models/Product.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  rating: { type: Number },
  imageUrl: { type: String },
});

const Product = mongoose.model("Product", userSchema); // Make sure the model name is 'Product'
module.exports = Product;
