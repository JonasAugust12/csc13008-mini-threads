const express = require('express');
const router = express.Router();
const activityController = require('../Controllers/activityController');

// Route cho trang Activity
router.get('/', activityController);
router.get('/:type', activityController);

module.exports = router;
