const router = require("express").Router();
const orderController = require("../../controllers/orderController");
const processOrder = require("../../orders");
const isAdmin = require("../validation");

// api/inventory routes
router.route("/new").post(processOrder);
router
  .route("/status")
  .get((req, res) => {
    if (isAdmin(req, res)) {
      orderController.findAll(req, res);
    }
  })
  .delete((req, res) => {
    if (isAdmin(req, res)) {
      orderController.empty(req, res);
    }
  });
router
  .route("/status/:conf")
  .get(orderController.findByConf)
  .post((req, res) => {
    if (isAdmin(req, res)) {
      orderController.updateStatus(req, res);
    }
  });

module.exports = router;
