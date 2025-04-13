const db = require('../models');
const President = db.presidents;

exports.create = async (req, res) => {
  try {
    const president = await President.create(req.body);
    res.status(201).send({ message: 'President added', data: president });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const presidents = await President.findAll({ order: [['created_at', 'DESC']] });
    res.status(200).send(presidents);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const president = await President.findByPk(req.params.id);
    if (!president) return res.status(404).send({ message: 'President not found' });
    res.status(200).send(president);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const president = await President.findByPk(req.params.id);
    if (!president) return res.status(404).send({ message: 'President not found' });
    await president.update(req.body);
    res.status(200).send({ message: 'President updated', data: president });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const president = await President.findByPk(req.params.id);
    if (!president) return res.status(404).send({ message: 'President not found' });
    await president.destroy();
    res.status(200).send({ message: 'President deleted' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};