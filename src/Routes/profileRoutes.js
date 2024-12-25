const express = require('express');
const router = express.Router();
const { profileController, updateProfileController, getOtherUserProfile, followController } = require('../Controllers/profileController');
const authenticateToken = require('../Middleware/auth');
const upload = require('../Middleware/multer');

// Route cho trang Home
router.get('/', authenticateToken, profileController);
router.post('/edit', authenticateToken, upload.single('post_image'), updateProfileController);
router.get('/:id', authenticateToken, getOtherUserProfile);

router.post('/follow/:id', authenticateToken, followController);

//gfs version
// // Route to upload avatar
// router.post('/upload-avatar', authenticateToken, upload.single('avatar'), uploadAvatar);

// // Route to get user profile avatar
// router.get('/avatar/:id', getAvatar);

module.exports = router;
