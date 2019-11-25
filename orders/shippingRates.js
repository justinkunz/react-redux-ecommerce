require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
const {
  origin_zip,
  weight,
  height,
  width,
  length,
  order_proc_time
} = require("../config.json").shipping;

const { EASYSHIP_TOKEN } = process.env;

const getShipmentCost = async dest_zip => {
  const costs = await axios({
    method: "POST",
    url: "https://api.easyship.com/rate/v1/rates",
    headers: {
      Authorization: `Bearer ${EASYSHIP_TOKEN}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data: {
      origin_country_alpha2: "US",
      origin_postal_code: origin_zip,
      destination_country_alpha2: "US",
      destination_postal_code: dest_zip,
      taxes_duties_paid_by: "Sender",
      is_insured: false,
      items: [
        {
          height,
          width,
          length,
          actual_weight: weight,
          category: "mobiles",
          declared_currency: "USD",
          declared_customs_value: 100
        }
      ]
    }
  });

  const shippingCosts = costs.data.rates.map(r => {
    const {
      min_delivery_time,
      max_delivery_time,
      shipment_charge_total,
      courier_display_name,
      courier_id
    } = r;

    return {
      timeframe: {
        days: {
          min_delivery_time,
          max_delivery_time
        },
        dates: {
          min: moment()
            .add(min_delivery_time + order_proc_time, "d")
            .format("MM/DD/YYYY"),
          max: moment()
            .add(max_delivery_time + order_proc_time, "d")
            .format("MM/DD/YYYY")
        }
      },
      total: shipment_charge_total * 100,
      courier: courier_display_name,
      courier_id
    };
  });
  return shippingCosts;
};

module.exports = getShipmentCost;
