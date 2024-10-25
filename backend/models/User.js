const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String }
}); 

module.exports = mongoose.model('User', UserSchema);
