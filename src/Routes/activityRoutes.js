const express = require('express');
const router = express.Router();
const activityController = require('../Controllers/activityController');
const authenticateToken = require('../Middleware/auth');

// Route cho trang Activity
router.get('/', authenticateToken, activityController);
router.get('/:type', authenticateToken, activityController);

module.exports = router;
