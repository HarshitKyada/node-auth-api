const express = require("express");
const Payment = require("../../models/Payment");
const Bill = require("../../models/Bill");
const Checkout = require("../../models/Checkout");

const router = express.Router();

// Placeholder function for generating unique IDs
const generateUniqueId = () => {
  return 'id_' + Math.random().toString(36).substr(2, 9); // Example unique ID generator
};

router.post("/successpayment", async (req, res) => {
  try {
    const { token, email } = req.body;

    // Fetch bill and checkout documents based on the token
    const [addBill, addCheckout] = await Promise.all([
      Bill.findOne({ token }),
      Checkout.findOne({ token }),
    ]);

    // Handle cases where the bill is not found
    if (!addBill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found for the provided token.",
      });
    }

    // Create or update the payment entry
    let addPayment = await Payment.findOne({ email });

    if (!addPayment) {
      // Create a new payment if it doesn't exist
      addPayment = new Payment({ email, data: [addBill] });
    } else {
      // Update the existing payment entry
      addPayment.data.push(addBill);
    }

    // Check if addCheckout exists and validate items
    if (addCheckout) {
      // Ensure all items have a uniqueId or generate one
      addCheckout.items.forEach(item => {
        if (item.uniqueId == null) {
          item.uniqueId = generateUniqueId(); // Generate a unique ID if null
        }
      });

      // Check again for null uniqueIds after generating
      const hasNullUniqueId = addCheckout.items.some(item => item.uniqueId == null);
      if (hasNullUniqueId) {
        return res.status(400).json({
          success: false,
          message: "Items cannot have null uniqueIds.",
        });
      }

      // Save the updated checkout
      await addCheckout.save(); // Save the updated checkout
    }

    // Save the payment entry
    await addPayment.save();

    // Delete the bill after successful payment
    await Bill.deleteOne({ token });

    // Respond with success
    return res.status(201).json({
      success: true,
      message: "Payment processed successfully, and data removed.",
      data: addBill,
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
