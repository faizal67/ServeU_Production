const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for Services Provided
const ServiceSchema = new Schema({
    serviceName: { type: String, required: true },
    description: { type: String, required: true },
    // Add other fields as needed
});

// Schema for Customer Bookings
const BookingSchema = new Schema({
    customerName: { type: String, required: true },
    service: { type: Schema.Types.ObjectId, ref: 'Service' },
    bookingDate: { type: Date, default: Date.now },
    // Add other fields as needed
});

// Schema for Cook/Chef Service Provider
const ChefServiceSchema = new Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    experience: { type: Number, required: true },
    services: [ServiceSchema], // Embedded Service Schema
    bookings: [BookingSchema], // Embedded Booking Schema
    // Add other fields as needed
});

const ChefService = mongoose.model('ChefService', ChefServiceSchema);
const Service = mongoose.model('Service', ServiceSchema);
const Booking = mongoose.model('Booking', BookingSchema);

module.exports = { ChefService, Service, Booking };
