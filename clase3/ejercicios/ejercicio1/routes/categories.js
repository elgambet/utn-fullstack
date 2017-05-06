const models = require("../model");

exports.list = (req, res) => {
  models.category
    .getAll()
    .then(categories => res.json(categories))
    .catch(err => res.status(500).json({ err }));
};

exports.get = (req, res) => {
  models.category
    .getById(req.params.id)
    .then(category => res.json(category))
    .catch(err => res.status(500).json({ err }));
};

exports.create = (req, res) => {
  models.category
    .add(req.body)
    .then(category => res.status(201).json(category))
    .catch(err => res.status(500).json({ err }));
};

exports.update = (req, res) => {
  models.category
    .update(req.body)
    .then(category => res.json(category))
    .catch(err => res.status(500).json({ err }));
};

exports.remove = (req, res) => {
  models.category
    .remove(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).json({ err }));
};
