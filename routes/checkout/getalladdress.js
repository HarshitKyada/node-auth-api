const express = require("express");
const Checkout = require("../../models/Checkout");

const router = express.Router();

router.get("/getalladdress/:id?", async (req, res) => {
  try {
    const { token } = req.headers;
    const { id } = req.params; // Optional _id parameter

    let userCart = await Checkout.findOne({ token: token });
    
    if (!userCart) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    // If an ID is provided, filter the address with that ID
    if (id) {
      const address = userCart.address.find((addr) => addr._id == id);
      
      if (!address) {
        return res.status(404).json({
          success: false,
          message: "Address not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Address found",
        address: address,
      });
    }

    // If no ID is provided, return all addresses
    return res.status(200).json({
      success: true,
      message: "Addresses retrieved successfully",
      addresses: userCart.address,
    });

  } catch (error) {
    console.error("Error retrieving addresses:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
