const express = require("express");
const Checkout = require("../../models/Checkout");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

router.post("/shopnow", async (req, res) => {
  try {
    const { name, description, price, token, count } = req.body;

    let userCart = await Checkout.findOne({ token: token });
    const uniqueId = uuidv4();
    if (!userCart) {
      userCart = new Checkout({
        token: token,
        items: [
          { name, description, price, productcount: count, uniqueId: uniqueId },
        ],
      });
    } else {
      // If user exists, add the new product to the items array
      userCart.items.push({
        name,
        description,
        price,
        productcount: count,
        uniqueId: uniqueId,
      });
    }

    await userCart.save();

    return res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      cart: userCart,
    });
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
