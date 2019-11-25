const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true }
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
