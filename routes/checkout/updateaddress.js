const express = require("express"); 
const Checkout = require("../../models/Checkout");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose"); // Make sure you have access to mongoose
const ObjectId = mongoose.Types.ObjectId;

const router = express.Router();

router.put("/editaddress/:id", async (req, res) => {
  try {
    const { username, phonenumber, city, pincode, state, fulladdress, token } = req.body;
    const { id } = req.params;

    // Convert `id` from params to an ObjectId
    const addressObjectId = new ObjectId(id);

    // Find the user's cart using the provided token
    let userCart = await Checkout.findOne({ token: token });

    if (!userCart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for the provided token.",
      });
    }
    
    // Find the specific address to update
    const addressIndex = userCart.address.findIndex(
      (address) => address.equals(addressObjectId)
    );

    if (addressIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Address not found with the provided ID.",
      });
    }

    // Update the address fields
    userCart.address[addressIndex] = {
      ...userCart.address[addressIndex], // Keep any other existing fields
      username,
      phonenumber,
      city,
      pincode,
      state,
      fulladdress,
    };

    // Save the updated cart
    await userCart.save();

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      cart: userCart,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
