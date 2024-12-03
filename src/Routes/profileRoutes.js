const express = require('express');
const router = express.Router();
const { profileController, updateProfileController, getOtherUserProfile, followController } = require('../Controllers/profileController');
const authenticateToken = require('../Middleware/auth');

// Route cho trang Home
router.get('/', authenticateToken, profileController);
router.post('/edit', authenticateToken, updateProfileController);
router.get('/:id', authenticateToken, getOtherUserProfile);

router.post('/follow/:id', authenticateToken, followController);

module.exports = router;
