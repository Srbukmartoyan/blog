const express = require('express');
const { validatePassword } = require('../middleware/errorHandler.js');
const AuthController = require('../controller/AuthController.js');

const router = express.Router();

router.post('/signup', validatePassword, AuthController.signup);
router.post('/signin', AuthController.signin);

module.exports = router;
