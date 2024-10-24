// routes/signup.js
const express = require("express");
const Product = require("../../models/Product"); // Ensure the path is correct

const router = express.Router();

// Route to get all products
router.get("/allproduct", async (req, res) => {

  try {
    // Fetch all products from the database
    const products = await Product.find();

    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error during fetching products:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
