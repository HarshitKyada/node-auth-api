// routes/signup.js
const express = require("express");
const bcrypt = require("bcrypt");
const Product = require("../../models/Product"); // Ensure the path is correct

const router = express.Router();

router.post("/product", async (req, res) => {
  try {
    const { id, name, description, price, rating, imageUrl } = req.body;

    // Create a new user
    const newUser = new Product({ id, name, description, price, rating, imageUrl });
    await newUser.save();

    return res
      .status(201)
      .json({ success: true, message: "Product created successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
