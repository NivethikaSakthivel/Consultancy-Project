const db = require('../models');
const Project = db.projects;

exports.create = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).send({ message: 'Project created successfully', data: project });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const projects = await Project.findAll({ order: [['created_at', 'DESC']] });
    res.status(200).send(projects);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).send({ message: 'Project not found' });
    res.status(200).send(project);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).send({ message: 'Project not found' });
    await project.update(req.body);
    res.status(200).send({ message: 'Project updated', data: project });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).send({ message: 'Project not found' });
    await project.destroy();
    res.status(200).send({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};