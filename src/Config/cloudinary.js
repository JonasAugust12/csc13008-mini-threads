require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (file, folder) => {
    if (!file) {
        throw new Error('File not found');
    }
    const uploadedImage = await new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                {
                    resource_type: 'image',
                    folder: 'phy000007',
                    overwrite: true,
                    folder,
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                },
            )
            .end(file.buffer);
    });
    return uploadedImage;
};

module.exports = {
    uploadImage,
};
