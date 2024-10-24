// routes/signup.js
const express = require("express");
const Product = require("../../models/Product"); // Ensure the path is correct

const router = express.Router();

// Route to get a product by ID
router.post("/viewproduct", async (req, res) => {
  try {
    const { id } = req.body;

    // Validate input
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    // Find the product by ID
    const existingProduct = await Product.findById(id); // Use findById for better readability

    if (existingProduct) {
      return res.status(200).json({ success: true, product: existingProduct });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Product does not exist" });
    }
  } catch (error) {
    console.error("Error during fetching product:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
