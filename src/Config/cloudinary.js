require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadAvatar = async (req, res) => {
    const file = req.file;
    // const uid =
    if (!file) {
        return res.status(400).send({ message: 'File not found' });
    }
    // const fName = 'avatar' + uid;
    try {
        const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'image',
            // public_id: fName,
            folder: 'csc13008/avatar',
            overwrite: true,
        });
        return uploadedImage;
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const uploadPostImage = async (req, res) => {
    const file = req.file;
    // const postId =
    if (!file) {
        return res.status(400).send({ message: 'File not found' });
    }
    // const fName = 'post' + postId;
    try {
        const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'image',
            // public_id: fName,
            folder: 'csc13008/post',
            overwrite: true,
        });
        return uploadedImage;
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const uploadCommentImage = async (req, res) => {
    const file = req.file;
    // const commentId =
    if (!file) {
        return res.status(400).send({ message: 'File not found' });
    }
    // const fName = 'comment' + commentId;
    try {
        const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'image',
            // public_id: fName,
            folder: 'csc13008/comment',
            overwrite: true,
        });
        return uploadedImage;
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
    uploadAvatar,
    uploadPostImage,
    uploadCommentImage,
};
