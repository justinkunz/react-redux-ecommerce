const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Inventory.find(req.query)
      .then(dbItems => res.json(dbItems))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Inventory.findById(req.params.id)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Inventory.create(req.body)
      .then(dbItems => res.json(dbItems))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Inventory.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(updates => res.json(updates))
      .catch(err => res.status(422).json(err));
  },
  empty: function(req, res) {
    db.Inventory.deleteMany({})
      .then(dbItems => res.json(dbItems))
      .catch(err => res.status(422).json(err));
  }
};
