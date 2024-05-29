const mongoose = require('mongoose');
const provider = require('./provider');

const serviceSchema = new mongoose.Schema({
    status: String,
    from: String,
    to: String,
    time: String,
    timestamp: { type: Date, default: Date.now },
    serviceCategory: String,
    serviceName: String,
    price: Number,
    rating: { type: Number, default: 0 },
    review: { type: String, default: '' },
    location: String,
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
    serviceUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceUser' }
});

module.exports =  mongoose.model('Service',serviceSchema)