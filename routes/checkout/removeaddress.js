const express = require("express");
const Checkout = require("../../models/Checkout");

const router = express.Router();

router.delete("/deleteaddress/:id", async (req, res) => {
  try {
    const { token } = req.headers;
    const { id } = req.params; // Destructure `id` from request parameters

    let userCart = await Checkout.findOne({ token: token });

    if (userCart) {
      userCart.address = userCart.address.filter(
        (item) => item._id.toString() !== id
      );

      await userCart.save();

      return res.status(200).json({
        success: true,
        message: "Address deleted successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }
  } catch (error) {
    console.error("Error deleting address:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
