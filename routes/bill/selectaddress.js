const express = require("express");
const Checkout = require("../../models/Checkout");
const mongoose = require("mongoose"); // Ensure mongoose is available
const Bill = require("../../models/Bill");
const User = require("../../models/User");
const ObjectId = mongoose.Types.ObjectId;

const router = express.Router();

router.post("/selectaddress", async (req, res) => {
  try {
    const { id, token } = req.body;

    let userCart = await Checkout.findOne({ token: token });
    let addBill = await Bill.findOne({ token: token });
    let user = await User.findOne({
      token: token,
    });
    if (!userCart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for the provided token.",
      });
    } else {
      // Convert id to ObjectId for comparison
      const addressObjectId = new ObjectId(id);

      // Filter out the address with the matching ObjectId
      const useAddress = userCart.address.filter((value) =>
        value._id.equals(addressObjectId)
      );

      // Ensure there is an address found
      if (useAddress.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Address not found for the provided ID.",
        });
      }

      // Create or update the bill with the selected address
      if (addBill) {
        addBill.address = useAddress[0];
        await addBill.save();
      } else {
        addBill = new Bill({
          token: token,
          email: user?.email,
          address: useAddress[0],
        });
        await addBill.save();
      }
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
