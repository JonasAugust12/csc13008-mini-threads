const express = require('express');
const router = express.Router();
const { loginController, signupController } = require('../Controllers/authController');

// Route đăng nhập
router.get('/login', loginController);

// Route đăng ký
router.get('/signup', signupController);

module.exports = router;
