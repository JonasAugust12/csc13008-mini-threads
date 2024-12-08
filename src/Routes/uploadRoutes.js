const express = require('express');
const router = express.Router();
const upload = require('../Middleware/multer');
const { uploadAvatar, uploadPostImage, uploadCommentImage } = require('../config/cloudinary');

router.post('/test-upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        console.log(req.file);

        const uploadedImage = await uploadAvatar(req, res);

        console.log(uploadedImage.secure_url);

        return res.status(200).json({
            message: 'File uploaded successfully',
            url: uploadedImage.secure_url,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

module.exports = router;
