const mongoose = require('mongoose');

const serviceUserSchema = new mongoose.Schema({
    displayName: String,
    email: String,
    mobile: Number,
    address: String,
    applied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }], // Reference to Service
    current: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }], // Reference to Service
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }] // Reference to Service
});

module.exports =  mongoose.model('ServiceUser',serviceUserSchema)