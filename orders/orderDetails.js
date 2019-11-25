const db = require("../models");
const calcShipping = require("./shippingRates");
require("../prototypes");

const verifyOrderDetails = async details => {
  const cart = (
    await Promise.all(details.cart.map(item => db.Inventory.findById(item.id)))
  ).map((e, i) => {
    const { _id, price, name } = e;
    const { qty } = details.cart[i];
    return { _id, price, name, qty };
  });

  const courier_id = details.shipping.option;
  const shippingOptions = await calcShipping(details.shipping.adr.zip);
  const choosenShipping =
    shippingOptions[shippingOptions.partialMatch({ courier_id })];

  const subtotal = cart.reduce(
    (a, c) => a + parseInt(c.price) * parseInt(c.qty),
    0
  );

  const order = {
    confirmation: generateConfCode(),
    orderStatus: "PROCESSING",
    time: Date.now(),
    customer: {
      email: details.customer.email,
      firstName: details.customer.firstName,
      lastName: details.customer.lastName
    },
    total: {
      subtotal,
      tax: parseInt((subtotal * 0.07).toFixed(0)),
      shippingCost: choosenShipping.total,
      total: parseInt((subtotal * 1.07 + choosenShipping.total).toFixed(0))
    },
    cart,
    address: details.shipping.adr,
    shipping: choosenShipping,
    payment: {
      stripeToken: details.token.id,
      last4: details.token.card.last4,
      cardIssuer: details.token.card.brand,
      cardCountry: details.token.card.country,
      cardZip: details.token.card.address_zip
    }
  };

  return order;
};

const generateConfCode = () => {
  const a = "1234567890WERTYUIOPASDFGHJKLZXCVBNM";
  return Array.apply(null, Array(6))
    .map(() => a[Math.floor(Math.random() * a.length)])
    .join("");
};
module.exports = verifyOrderDetails;
