const express = require("express");
const Cart = require("../../models/Cart");
const User = require("../../models/User");

const router = express.Router();

router.post("/addtocart", async (req, res) => {
  try {
    const { id, name, description, price, rating, imageUrl, token } = req.body;

    let userCart = await Cart.findOne({ user: token });
    let allUser = await User.find({ token });

    if (allUser?.length === 1 && allUser[0]?.token) {
      if (!userCart) {
        userCart = new Cart({
          user: token,
          items: [{ id, name, description, price, rating, imageUrl }],
        });
      } else {
        // If user exists, add the new product to the items array
        userCart.items.push({ id, name, description, price, rating, imageUrl });
      }

      await userCart.save();

      return res.status(201).json({
        success: true,
        message: "Product added to cart successfully",
        cart: userCart,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
