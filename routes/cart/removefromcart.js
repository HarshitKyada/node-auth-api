// routes/signup.js
const express = require("express");
const Cart = require("../../models/Cart"); // Ensure the path is correct

const router = express.Router();

// Route to remove an item from the cart by ID
router.delete("/removefromcart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.headers;

    // Validate input
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Cart ID is required",
      });
    }

    // Find the cart by user token
    const user = token; // Assuming the token is the user identifier
    const existingCart = await Cart.findOne({ user });

    if (existingCart) {
      // Filter out the item with the specified ID
      const initialItemCount = existingCart.items.length;
      existingCart.items = existingCart.items.filter(
        (item) => item._id.toString() !== id
      );

      // Check if an item was actually removed
      if (existingCart.items.length === initialItemCount) {
        return res.status(404).json({
          success: false,
          message: "Item does not exist in the cart",
        });
      }

      // Save the updated cart
      await existingCart.save();

      return res.status(200).json({
        success: true,
        message: "Item removed successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Cart does not exist",
      });
    }
  } catch (error) {
    console.error("Error during removing item from cart:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
