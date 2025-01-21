const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
    user_id: String,
    logs: [{
        in: {type: Number},
        out: {type:Number},
        reason: {type: String},
        date: Date
    }]
}, { timestamps: true });

const Details = mongoose.model('details', detailsSchema);

module.exports = Details;
