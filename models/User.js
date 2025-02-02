// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
  uniqueId: { type: String },
});

const User = mongoose.model('User', userSchema); // Make sure the model name is 'User'
module.exports = User;
