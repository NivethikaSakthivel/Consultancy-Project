const express = require('express');
const router = express.Router();
const controller = require('../controllers/project.controller');
const { verifyToken } = require('../middleware/auth.jwt');

router.post('/', verifyToken, controller.create);
router.get('/', verifyToken, controller.findAll);
router.get('/:id', verifyToken, controller.findOne);
router.put('/:id', verifyToken, controller.update);
router.delete('/:id', verifyToken, controller.delete);

module.exports = router;
