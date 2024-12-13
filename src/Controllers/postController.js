const Post = require('../Models/Post');
const User = require('../Models/User'); // Import User model
const { uploadPostImage } = require('../Config/cloudinary');

const postController = async (req, res) => {
    try {
        console.log('User ID:', req.userId); // Debugging line
        if (!req.userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        console.log('Received request for post creation by user ID:', req.userId);

        if (req.method !== 'POST') {
            console.log('Invalid request method:', req.method);
            return res.status(400).json({ error: 'Invalid request method' });
        }

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

        // Fetch the user details from the database
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create the new post with real user data
        const newPost = new Post({
            user: {
                username: user.username,
                user_display_name: user.profile.display_name,
                user_nick_name: user.profile.nick_name,
                user_bio: user.profile.bio,
                avatarSrc: user.profile.avt || '/Img/UserIcon.jpg',
                user_profile_link: `/profile/${user._id}`,
                user_followers_count: user.followers_count || 0,
            },
            post_quote: post_quote || '',
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
