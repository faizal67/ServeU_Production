const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for Menu Items
const MenuItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    // Add other fields as needed
});

// Schema for Customer Orders
const OrderSchema = new Schema({
    customerName: { type: String, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
    orderDate: { type: Date, default: Date.now },
    // Add other fields as needed
});

// Schema for Tiffin Service Provider
const TiffinServiceProviderSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    menu: [MenuItemSchema], // Embedded Menu Schema
    orders: [OrderSchema], // Embedded Order Schema
    rating: Number
});

const TiffinServiceProvider = mongoose.model('TiffinServiceProvider', TiffinServiceProviderSchema);
const MenuItem = mongoose.model('MenuItem', MenuItemSchema);
const Order = mongoose.model('Order', OrderSchema);

module.exports = { TiffinServiceProvider, MenuItem, Order };
