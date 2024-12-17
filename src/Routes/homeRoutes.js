const express = require('express');
const router = express.Router();
const homeController = require('../Controllers/homeController');
const authenticateToken = require('../Middleware/auth');

router.get('/', authenticateToken, homeController);
// router.get('/following', authenticateToken, homeController);
router.get('/:selectedItem', authenticateToken, homeController);

module.exports = router;
