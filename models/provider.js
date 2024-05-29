const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    displayName: String,
    email: String,
    mobile: Number,
    address: String,
    gender: String,
    age: Number,
    education: String,
    businessName: String,
    category: String,
    description: String,
    experience: Number,
    rating: Number,
    image:String,
    provides : [{ type: mongoose.Schema.Types.ObjectId, ref: 'ServiceList' }],
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }], // Reference to Service
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }], // Reference to Service
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }], // Reference to Service
    current: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }], // Reference to Service
    currentUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ServiceUser' }] // Reference to ServiceUser
});

module.exports = mongoose.model('Provider', providerSchema)
    
