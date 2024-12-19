const express = require('express');
const router = express.Router();
const homeController = require('../Controllers/homeController');
const authenticateToken = require('../Middleware/auth');

// Route cho trang Home
router.get('/', authenticateToken, homeController);

module.exports = router;
