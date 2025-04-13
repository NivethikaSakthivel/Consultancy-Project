const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.jwt');

router.post('/signup', controller.signup);
router.post('/signin', controller.signin);
router.post('/change-password', verifyToken, controller.changePassword);

module.exports = router;