const calcShipping = require("../../orders/shippingRates");
const router = require("express").Router();

// api/shipping routes
router.route("/shipping").post(async (req, res) => {
  const resp = await calcShipping(req.body.destZip);
  res.json(resp);
});

module.exports = router;
