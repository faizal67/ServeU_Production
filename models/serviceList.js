const mongoose = require('mongoose');

const serviceListSchema = new mongoose.Schema({
    serviceName : String,
    time : String,
    price : Number,
    available : Boolean,
    provider :  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider'
      }
})

module.exports = mongoose.model('ServiceList',serviceListSchema)