const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for Products
const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    // Add other fields as needed
});

// Schema for Customer Orders
const OrderSchema = new Schema({
    customerName: { type: String, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    orderDate: { type: Date, default: Date.now },
    // Add other fields as needed
});

// Schema for Grocery Shop Owner
const GroceryShopOwnerSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    products: [ProductSchema], // Embedded Product Schema
    orders: [OrderSchema], // Embedded Order Schema
    // Add other fields as needed
});

const GroceryShopOwner = mongoose.model('GroceryShopOwner', GroceryShopOwnerSchema);
const Product = mongoose.model('Product', ProductSchema);
const Order = mongoose.model('Order', OrderSchema);

module.exports = { GroceryShopOwner, Product, Order };
