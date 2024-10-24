// routes/signup.js
const express = require("express");
const Cart = require("../../models/Cart"); // Ensure the path is correct

const router = express.Router();

// Route to get a cart by ID
router.post("/viewcart", async (req, res) => {
  try {
    const { token } = req.body;

    // Validate input
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorize user",
      });
    }

    // Find the cart by ID
    const user = token;
    const existingCart = await Cart.findOne({ user });

    if (existingCart) {
      return res.status(200).json({
        success: true,
        cart: existingCart,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Cart does not exist",
      });
    }
  } catch (error) {   
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
