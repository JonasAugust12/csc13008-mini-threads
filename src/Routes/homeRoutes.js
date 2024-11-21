const express = require('express');
const router = express.Router();
const homeController = require('../Controllers/homeController');

// Route cho trang Home
router.get('/', homeController);

module.exports = router;
