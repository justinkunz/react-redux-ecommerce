const orderDetails = require("./orderDetails");
const verifyPayment = require("./verifyPayment");
const db = require("../models");
const sendEmail = require("../notifications/orderConf");

const processOrders = async (req, res) => {
  try {
    console.time("🚀");
    const order = await orderDetails(req.body);
    // TO DO: Validate address
    const paymentResponse = await verifyPayment(order);
    order.payment.outcome = paymentResponse;
    console.log(order);

    if (order.payment.outcome.network_status === "approved_by_network") {
      const { cart, address, shipping, total, confirmation } = order;
      const { addressLine1, addressLine2, city, state, zip } = address;

      const emailData = {
        conf: confirmation,
        items: cart.map(it => {
          console.log(it);
          console.log(it.price);
          const { name, qty } = it;
          console.log(parseInt(it.price) / 100);

          return {
            name,
            qty,
            total: ((parseInt(it.price) * qty) / 100).toFixed(2)
          };
        }),
        shipping: {
          adr: {
            l1: addressLine1,
            l2: addressLine2,
            l3: `${city} ${state}, ${zip}`
          },
          cost: (total.shippingCost / 100).toFixed(2),
          date: shipping.timeframe.dates.min
        },
        tax: (total.tax / 100).toFixed(2),
        total: (total.total / 100).toFixed(2),
        email: order.customer.email
      };
      const em = await sendEmail(emailData);
      console.log(em);
      await db.Orders.create(order);
      res.status(200).json({
        status: "success",
        desc: "order_successful",
        conf: order.confirmation
      });
      console.timeEnd("🚀");
    } else {
      res.status(200).json({
        status: "failed",
        desc: "card_decline"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(502).json({
      status: "error",
      desc: "unexpected_err"
    });
  }
};

module.exports = processOrders;
