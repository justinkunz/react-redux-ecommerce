require("dotenv").config();
const router = require("express").Router();
const configSettings = require("../../config.json");

const { STRIPE_TEST_PK, STRIPE_LIVE_PK, STRIPE_MODE } = process.env;

// api/config routes
router.route("/").get(function(req, res) {
  res.json({
    ...configSettings.appData,
    stripePublicKey: STRIPE_MODE === "live" ? STRIPE_LIVE_PK : STRIPE_TEST_PK
  });
});

module.exports = router;
