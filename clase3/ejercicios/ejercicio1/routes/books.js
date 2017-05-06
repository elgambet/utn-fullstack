const models = require("../model");

exports.list = (req, res) => {
  models.book
    .getAll(req.query.q)
    .then(books => res.json(books))
    .catch(err => res.status(500).json({ err }));
};

exports.get = (req, res) => {
  models.book
    .getById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(500).json({ err }));
};

exports.create = (req, res) => {
  models.book
    .add(req.body)
    .then(book => res.status(201).json(book))
    .catch(err => res.status(500).json({ err }));
};

exports.update = (req, res) => {
  models.book
    .update(req.body)
    .then(book => res.json(book))
    .catch(err => res.status(500).json({ err }));
};

exports.remove = (req, res) => {
  models.book
    .remove(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).json({ err }));
};
