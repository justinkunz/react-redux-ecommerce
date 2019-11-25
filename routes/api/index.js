const path = require("path");
const router = require("express").Router();
const inventoryRoutes = require("./inventory");
const configRoutes = require("./config");
const orderRoutes = require("./orders");
const addressRoutes = require("./address");

// /api routes
router.use("/inventory", inventoryRoutes);
router.use("/config", configRoutes);
router.use("/orders", orderRoutes);
router.use("/address", addressRoutes);

module.exports = router;
