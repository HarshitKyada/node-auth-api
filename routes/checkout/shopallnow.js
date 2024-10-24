const express = require("express");
const Checkout = require("../../models/Checkout");
const { v4: uuidv4 } = require("uuid");
const Cart = require("../../models/Cart");

const router = express.Router();

router.post("/shopallnow", async (req, res) => {
  try {
    const { items, token } = req.body;

    let userCart = await Checkout.findOne({ token: token });
    let allCart = await Cart.findOne({ user: token });
    const uniqueId = uuidv4();
    const newItems = [
      ...items?.map((value) => {
        return {
          name: value?.name,
          description: value?.description,
          price: value?.price,
          productcount: value?.count,
          uniqueId: uniqueId,
        };
      }),
    ];
    if (!userCart) {
      userCart = new Checkout({
        token: token,
        items: newItems,
      });
    } else {
      // If user exists, add the new product to the items array
      userCart.items.push(...newItems);
    }

    await userCart.save();

    allCart.items = [];

    await allCart.save();

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
