require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Import your route modules
const login = require("./routes/auth/login");
const signup = require("./routes/auth/signup");
const sync = require("./routes/auth/sync");
const product = require("./routes/product/product");
const allproducts = require("./routes/product/allproducts");
const viewproduct = require("./routes/product/viewproduct");
const addtocart = require("./routes/cart/addtocart");
const viewcart = require("./routes/cart/viewcart");
const removefromcart = require("./routes/cart/removefromcart");
const shopnow = require("./routes/checkout/shopnow");
const shopallnow = require("./routes/checkout/shopallnow");
const addnewaddress = require("./routes/checkout/addnewaddress");
const getalladdress = require("./routes/checkout/getalladdress");
const removeaddress = require("./routes/checkout/removeaddress");
const updateaddress = require("./routes/checkout/updateaddress");
const selectaddress = require("./routes/bill/selectaddress");
const showingbill = require("./routes/bill/showingbill");
const successpayment = require("./routes/bill/successpayment");
const cancelbill = require("./routes/bill/cancelbill");

const app = express();
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection using the connection string from environment variables
const dbURI = process.env.MONGODB_URI; // Get MongoDB URI from environment variables

if (!dbURI) {
  console.error("MongoDB URI is not defined in environment variables.");
  process.exit(1); // Exit if the URI is not defined
}
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,  // Adjust timeout as needed
});

// API Routes
app.use("/items", login);
app.use("/items", signup);
app.use("/items", sync);
app.use("/items", product);
app.use("/items", allproducts);
app.use("/items", viewproduct);
app.use("/items", addtocart);
app.use("/items", viewcart);
app.use("/items", removefromcart);
app.use("/items", shopnow);
app.use("/items", shopallnow);
app.use("/items", addnewaddress);
app.use("/items", getalladdress);
app.use("/items", removeaddress);
app.use("/items", updateaddress);
app.use("/items", selectaddress);
app.use("/items", showingbill);
app.use("/items", cancelbill);
app.use("/items", successpayment);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
