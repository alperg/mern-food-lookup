const db = require("../models");

// Defining methods for the foodController
module.exports = {
  findAll: function(req, res) {
    db.Food
      .findAll({})
      .then(foods => {
        res.json(foods);
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Food
      .find({ _id: req.params.id })
      .then(foods => {
        res.json(foods);
      })
      .catch(err => res.status(422).json(err));
  }
};
