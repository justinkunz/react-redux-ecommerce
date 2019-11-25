const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  confirmation: { type: String, required: true },
  time: { type: Date, required: true },
  customer: { type: Object, required: true },
  total: { type: Object, required: true },
  cart: { type: Array, required: true },
  shipping: { type: Object, required: true },
  address: { type: Object, required: true },
  payment: { type: Object, required: true },
  orderStatus: { type: String, required: true }
});

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;
