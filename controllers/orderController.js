const db = require("../models");

module.exports = {
  findAll: (req, res) => {
    db.Orders.find({})
      .then(orders => res.status(200).json(orders))
      .catch(err => res.status(502).send(err));
  },
  findByConf: (req, res) => {
    db.Orders.findOne({ confirmation: req.params.conf })
      .then(order =>
        res
          .status(200)
          .json({ status: "success", orderStatus: order.orderStatus })
      )
      .catch(err => res.status(200).json({ status: "error", desc: err }));
  },
  empty: (req, res) => {
    db.Orders.deleteMany({})
      .then(res => res.status(200).json(res))
      .catch(err => res.status(200).send(err));
  },
  updateStatus: (req, res) => {
    console.log(req.body);
    db.Orders.findOneAndUpdate(
      { confirmation: req.params.conf },
      { orderStatus: req.body.status }
    )
      .then(updateRes => res.status(200).send(updateRes))
      .catch(err => res.status(502).send(err));
  }
};
