const express = require("express");
const Checkout = require("../../models/Checkout");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

router.post("/selectaddress", async (req, res) => {
  try {
    const { username, phonenumber, city, pincode, state, fulladdress, token } =
      req.body;

    let userCart = await Checkout.findOne({ token: token });
    const uniqueId = uuidv4();
    if (!userCart) {
      userCart = new Checkout({
        token: token,
        address: [
          {
            username,
            phonenumber,
            city,
            pincode,
            state,
            fulladdress,
            uniqueId: uniqueId,
          },
        ],
      });
    } else {
      // If user exists, add the new product to the items array
      userCart.address.push({
        username,
        phonenumber,
        city,
        pincode,
        state,
        fulladdress,
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
