const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mode: {
    type: String,
    required: true, // "BUY" or "SELL"
  },
  userEmail: {
    type: String,
    index : true, // Links the order to the logged-in user
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the time of trade
  },
});

module.exports = { OrdersSchema };