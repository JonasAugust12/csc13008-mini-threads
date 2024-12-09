require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Reusable function to upload images to Cloudinary
 * @param {Buffer} fileBuffer - The file buffer from the request
 * @param {string} folder - The folder to upload the image in Cloudinary
 * @returns {Promise<object>} - The result from Cloudinary
 */
const uploadImageToCloudinary = (fileBuffer, folder) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'image',
                folder,
                overwrite: true,
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            },
        );

        stream.end(fileBuffer); // Write file buffer to the upload stream
    });
};

const uploadAvatar = async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: 'File not found' });
    }

    try {
        const uploadedImage = await uploadImageToCloudinary(file.buffer, 'csc13008/avatar');
        return res.status(200).json({
            message: 'Avatar uploaded successfully',
            url: uploadedImage.secure_url,
        });
    } catch (error) {
        console.error('Avatar upload error:', error);
        return res.status(500).json({ message: error.message });
    }
};

const uploadPostImage = async (req) => {
    const file = req.file;
    if (!file) throw new Error('File not found');

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'image',
                folder: 'csc13008/post',
                overwrite: true,
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            },
        );
        stream.end(file.buffer); // Send file buffer to the stream
    });
};

const uploadCommentImage = async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: 'File not found' });
    }

    try {
        const uploadedImage = await uploadImageToCloudinary(file.buffer, 'csc13008/comment');
        return res.status(200).json({
            message: 'Comment image uploaded successfully',
            url: uploadedImage.secure_url,
        });
    } catch (error) {
        console.error('Comment image upload error:', error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    uploadAvatar,
    uploadPostImage,
    uploadCommentImage,
};
