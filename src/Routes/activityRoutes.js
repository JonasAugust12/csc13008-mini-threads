const express = require('express');
const router = express.Router();
const activityController = require('../Controllers/activityController');

// Route cho trang Activity
router.get('/', activityController);

module.exports = router;
