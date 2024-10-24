const express = require("express");
const User = require("../../models/User");

const router = express.Router();

router.post("/sync", async (req, res) => {
  try {
    const { token } = req?.body;
    const existingUser = await User.findOne({ token });

    if (existingUser) {
      // Check if the password is valid

      return res.status(200).json({
        success: true,
        message: `You are a user`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Login failed",
        error: "User not found",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
