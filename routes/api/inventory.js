const router = require("express").Router();
const inventoryController = require("../../controllers/inventoryController.js");
const isAdmin = require("../validation");

// api/inventory routes
router
  .route("/")
  .get(inventoryController.findAll)
  .post((req, res) => {
    if (isAdmin(req, res)) {
      inventoryController.create(req, res);
    }
  })
  .delete((req, res) => {
    if (isAdmin(req, res)) {
      inventoryController.empty(req, res);
    }
  });

router.route("/:id").put((req, res) => {
  if (isAdmin(req, res)) {
    inventoryController.update(req, res);
  }
});

module.exports = router;
