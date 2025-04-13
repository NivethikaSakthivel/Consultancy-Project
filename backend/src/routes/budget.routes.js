const express = require('express');
const router = express.Router();
const controller = require('../controllers/budget.controller');
const { verifyToken } = require('../middleware/auth.jwt');
const upload = require('../middleware/upload');

router.post('/', verifyToken, upload.single('proof'), controller.create);
router.get('/', verifyToken, controller.findAll);
router.get('/summary', verifyToken, controller.getMonthlySummary);
router.get('/:id', verifyToken, controller.findOne);
router.put('/:id', verifyToken, upload.single('proof'), controller.update);
router.delete('/:id', verifyToken, controller.delete);
router.get('/download/:fileName', verifyToken, controller.downloadProof);

module.exports = router;
