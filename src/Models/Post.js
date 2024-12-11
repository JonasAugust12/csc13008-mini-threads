const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        username: { type: String, required: true },
        user_display_name: { type: String, required: true },
        user_nick_name: { type: String, required: true },
        user_bio: { type: String, required: true },
        avatarSrc: { type: String, required: true },
        user_profile_link: { type: String, required: true },
        user_followers_count: { type: Number, required: true },
    },
    createdAt: { type: Date, default: Date.now },
    post_quote: { type: String, required: true },
    post_images: { type: [String], default: [] },
    post_likes: { type: [String], default: [] },
    post_comments: { type: [String], default: [] },
    post_repost: { type: [String], default: [] },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
