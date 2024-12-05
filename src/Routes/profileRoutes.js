const express = require('express');
const router = express.Router();
const {
    profileController,
    updateProfileController,
    getOtherUserProfile,
    followController,
    getAvatar,
    uploadAvatar,
} = require('../Controllers/profileController');
const authenticateToken = require('../Middleware/auth');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Use the existing MongoDB connection
const conn = mongoose.connection;
dotenv.config();

// Set up GridFS storage
const storage = new GridFsStorage({
    url: process.env.MONGO_URL,
    file: (req, file) => {
        return {
            filename: `${req.userId}-${Date.now()}${path.extname(file.originalname)}`,
            bucketName: 'uploads',
        };
    },
    options: { useNewUrlParser: true, useUnifiedTopology: true },
});
const upload = multer({ storage });

// Route cho trang Home
router.get('/', authenticateToken, profileController);
router.post('/edit', authenticateToken, updateProfileController);
router.get('/:id', authenticateToken, getOtherUserProfile);

router.post('/follow/:id', authenticateToken, followController);

// Route to upload avatar
router.post('/upload-avatar', authenticateToken, upload.single('avatar'), uploadAvatar);

// Route to get user profile avatar
router.get('/avatar/:id', getAvatar);

module.exports = router;
