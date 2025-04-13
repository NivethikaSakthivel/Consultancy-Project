const db = require('../models');
const Service = db.services;

exports.create = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).send({ message: 'Service created', data: service });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const services = await Service.findAll({ order: [['created_at', 'DESC']] });
    res.status(200).send(services);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).send({ message: 'Service not found' });
    res.status(200).send(service);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).send({ message: 'Service not found' });
    await service.update(req.body);
    res.status(200).send({ message: 'Service updated', data: service });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).send({ message: 'Service not found' });
    await service.destroy();
    res.status(200).send({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};