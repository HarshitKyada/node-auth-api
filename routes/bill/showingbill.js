const express = require("express");
const Checkout = require("../../models/Checkout");
const Bill = require("../../models/Bill");

const router = express.Router();

router.get("/showingbill", async (req, res) => {
  try {
    const { token } = req.headers;

    // Check if token is provided
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required",
      });
    }

    const userCart = await Checkout.findOne({ token });
    const addBill = await Bill.findOne({ token });

    // Ensure the userCart exists
    if (!userCart) {
      return res.status(404).json({
        success: false,
        message: "User cart not found",
      });
    }

    // Check for null uniqueIds in userCart items before processing
    if (userCart.items.some(item => item.uniqueId == null)) {
      return res.status(400).json({
        success: false,
        message: "Items cannot have null uniqueIds.",
      });
    }

    // Process prices
    const allPricesArray = userCart.items.map((value) => value.price * value?.productcount || 0); // Ensure prices are valid numbers
    const allProducts = userCart.items.map((value) => ({
      productName: value.name,
      productPrice: value.price || 0, // Ensure prices are valid numbers
      productcount: value?.productcount || 1
    }));

    const totalPrice = allPricesArray.reduce((acc, price) => acc + price, 0);
    const gst = totalPrice * 0.18;
    const shippingCharge = 120;
    const totalBill = totalPrice + gst + shippingCharge;

    // If addBill exists and has all the necessary data, return it without modifying
    if (addBill) {
      if (
        addBill.product &&
        addBill.totalPrice !== undefined &&
        addBill.gst !== undefined &&
        addBill.shippingCharge !== undefined &&
        addBill.totalBill !== undefined
      ) {
        return res.status(200).json({
          success: true,
          message: "Bill retrieved successfully",
          data: addBill,
        });
      } else {
        // Update the bill with calculated values
        addBill.product = allProducts;
        addBill.totalPrice = totalPrice;
        addBill.gst = gst;
        addBill.shippingCharge = shippingCharge;
        addBill.totalBill = totalBill;

        await addBill.save(); // Ensure save is awaited
      }
    } else {
      // If addBill does not exist, create a new bill
      const newBill = new Bill({
        token,
        product: allProducts,
        totalPrice,
        gst,
        shippingCharge,
        totalBill,
      });

      await newBill.save(); // Ensure save is awaited
    }

    // Clear user cart
    userCart.items = [];
    await userCart.save(); // Ensure save is awaited

    return res.status(201).json({
      success: true,
      message: "Address selection processed successfully",
      data: addBill || newBill, // Return the updated or new bill
    });
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
