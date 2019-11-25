require("dotenv").config();

const { STRIPE_TEST_SK, STRIPE_LIVE_SK, STRIPE_MODE } = process.env;

const stripe = require("stripe")(
  STRIPE_MODE === "live" ? STRIPE_LIVE_SK : STRIPE_TEST_SK
);

const verifyPayment = async order => {
  return new Promise((resolve, reject) => {
    stripe.charges.create(
      {
        amount: order.total.total,
        currency: "usd",
        source: order.payment.stripeToken,
        description: order.confirmation
      },
      function(err, charge) {
        if (err) {
          return resolve({ err: err.code });
        } else {
          resolve({ ...charge.outcome, id: charge.id });
        }
      }
    );
  });
};

module.exports = verifyPayment;
