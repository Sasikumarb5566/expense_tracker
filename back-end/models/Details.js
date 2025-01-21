const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
    user_id: String,
    reason: String,
    amount: Number
}, { timestamps: true });

const Details = mongoose.model('details', detailsSchema);

module.exports = Details;
