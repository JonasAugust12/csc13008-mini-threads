const Post = require('../Models/Post');
const { uploadPostImage } = require('../Config/cloudinary');

const postController = async (req, res) => {
    const username = req.session?.username || 'Guest';
    console.log('Received request for post creation. Username:', username);

    if (req.method !== 'POST') {
        console.log('Invalid request method:', req.method);
        return res.status(400).json({ error: 'Invalid request method' });
    }

    try {
        let imageUrl = null;

        if (req.file) {
            try {
                const uploadResult = await uploadPostImage(req);
                imageUrl = uploadResult.url;
            } catch (uploadError) {
                console.error('Image upload failed:', uploadError.message);
                return res.status(500).json({ error: 'Image upload failed', details: uploadError.message });
            }
        }

        const { post_quote } = req.body;

        const newPost = new Post({
            user: {
                username: username,
                user_display_name: 'Justin Bieber', // Replace with actual data
                user_nick_name: 'Pdiddy',
                user_bio: 'I love fried chicken',
                avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
                user_profile_link: `/profile/${username}`,
                user_followers_count: 1000000, // Example data
            },
            post_quote: post_quote || ' ',
            post_images: imageUrl ? [imageUrl] : [],
            post_likes: [],
            post_comments: [],
            post_repost: [],
        });

        // Save the post to the database
        const savedPost = await newPost.save();

        return res.status(201).json({
            message: 'Post created successfully',
            post: savedPost,
        });
    } catch (error) {
        console.error('Error creating post:', error.message);
        return res.status(500).json({
            error: 'Failed to create post',
            details: error.message,
        });
    }
};

module.exports = postController;
