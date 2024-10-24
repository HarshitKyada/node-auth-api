const express = require("express");
const Checkout = require("../../models/Checkout");
const mongoose = require("mongoose"); // Ensure mongoose is available
const Bill = require("../../models/Bill");
const User = require("../../models/User");
const ObjectId = mongoose.Types.ObjectId;

const router = express.Router();

router.delete("/cancelbill", async (req, res) => {
  try {
    const { token } = req.headers;

    let userCart = await Checkout.findOne({ token: token });

    if (!userCart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for the provided token.",
      });
    } else {
      await Bill.deleteOne({ token });
      return res.status(201).json({
        success: true,
        message: "Address selection processed successfully",
      });
    }
  } catch (error) {
    console.error("Error selecting address:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
