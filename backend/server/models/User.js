const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required
  },
  email: {
    type: String,
    required
  },
  password: {
    type: String,
    required
  }
});

module.exports = mongoose.model('User', UserSchema);