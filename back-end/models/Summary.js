const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  cashIn: { type: Number, default: 0 },
  cashOut: { type: Number, default: 0 },
  balance: {type: Number, default: 0}
}, { timestamps: true });

const User = mongoose.model('summaries', userSchema);

module.exports = User;
