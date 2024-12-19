const Post1 = require('../Models/Post1');
const Notification = require('../Models/Notification');
const Comment = require('../Models/Comment');
const { uploadImage } = require('../Config/cloudinary');
let post1Controller = {};

post1Controller.createPost = async (req, res) => {
    try {
        const { post_quote } = req.body; // Nội dung bài viết (nếu có)

        // Biến lưu trữ URL ảnh (nếu có)
        let imageUrl = '';

        // Nếu có file ảnh, tiến hành upload
        if (req.file) {
            const uploadResult = await uploadImage(req.file); // Gọi hàm upload ảnh
            imageUrl = uploadResult.secure_url; // URL của ảnh sau khi upload lên Cloudinary
        }
        // Tạo bài post mới
        const newPost = new Post1({
            user_id: req.userId,
            post_quote: post_quote || '', // Nội dung bài viết
            post_image: imageUrl, // URL ảnh hoặc để trống nếu không có ảnh
            post_likes: [], // Danh sách người like (ban đầu trống)
            post_comments: [], // Danh sách comment (ban đầu trống)
        });

        const savedPost = await newPost.save();

        return res.status(201).json({
            message: 'Post created successfully',
            post: savedPost,
        });
    } catch (error) {
        console.error('Post creation error:', error);
        return res.status(500).json({ error: error.message });
    }
};

post1Controller.likePost = async (req, res) => {
    try {
        const postId = req.params.id; // Lấy ID bài viết từ params
        const userId = req.userId; // Lấy ID người dùng từ token
        const action = req.body.action; // Lấy action từ request body, để xác định 'like' hoặc 'unlike'

        // Tìm bài viết theo ID
        const post = await Post1.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Kiểm tra hành động "like"
        if (action === 'like') {
            // Kiểm tra nếu người dùng đã thích bài viết
            if (post.post_likes.includes(userId)) {
                return res.status(400).json({ message: 'You already liked this post' });
            }

            // Thêm user vào danh sách like
            post.post_likes.push(userId);
            await post.save();

            // Nếu người dùng là chủ bài viết thì không cần tạo thông báo
            if (post.user_id.toString() !== userId.toString()) {
                // Tạo thông báo cho người nhận (người chủ bài viết)
                const notification = new Notification({
                    action_user_id: userId,
                    user_id: post.user_id, // Người nhận thông báo là chủ bài viết
                    type: 'like',
                    post_id: postId,
                });
                await notification.save();
            }

            return res.status(200).json({ message: 'Post liked successfully' });
        } else if (action === 'unlike') {
            // Kiểm tra nếu người dùng chưa thích bài viết
            if (!post.post_likes.includes(userId)) {
                return res.status(400).json({ message: 'You have not liked this post' });
            }

            // Loại bỏ user khỏi danh sách like
            post.post_likes = post.post_likes.filter((id) => id.toString() !== userId.toString());
            await post.save();

            // Xoá thông báo "like" của người dùng
            await Notification.deleteOne({
                action_user_id: userId,
                type: 'like',
                post_id: postId,
            });

            return res.status(200).json({ message: 'Post unliked successfully' });
        } else {
            return res.status(400).json({ message: 'Invalid action' });
        }
    } catch (error) {
        console.error('Error processing like/unlike:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create comment
post1Controller.createComment = async (req, res) => {
    try {
        const { post_id, comment_content } = req.body; // Get the post ID and comment content
        const user_id = req.userId; // Get the user ID from token

        // Optional: Handle image upload for comment if any
        let comment_image = '';
        if (req.file) {
            const uploadResult = await uploadImage(req.file); // Upload image to Cloudinary
            comment_image = uploadResult.secure_url;
        }

        // Create a new comment
        const newComment = new Comment({
            post_id,
            user_id,
            comment_content,
            comment_image,
        });

        const savedComment = await newComment.save();

        const post = await Post1.findByIdAndUpdate(post_id, { $push: { post_comments: savedComment._id } }, { new: true });

        if (post.user_id.toString() !== user_id.toString()) {
            const notification = new Notification({
                action_user_id: user_id,
                user_id: post.user_id,
                type: 'comment',
                post_id: post_id,
                comment_id: savedComment._id,
            });
            await notification.save();
        }
        return res.status(200).json({
            message: 'Comment created successfully',
            comment: savedComment,
            user: req.user,
        });
    } catch (error) {
        console.error('Error creating comment:', error);
        return res.status(500).json({ error: error.message });
    }
};

post1Controller.renderpost = async (req, res) => {
    try {
        const postId = req.params.id; // Lấy ID bài viết từ params

        // Tìm bài viết theo ID và populate thông tin user_id để lấy thông tin của người dùng
        const post = await Post1.findById(postId)
            .populate('user_id', 'profile.nick_name profile.display_name profile.avt') // Populating thông tin người dùng
            .populate('post_likes', 'profile.nick_name profile.display_name profile.avt'); // Populating thông tin người thích bài viết
        // Kiểm tra nếu bài viết không tồn tại
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = await Comment.find({ post_id: postId })
            .populate('user_id', 'profile.nick_name profile.display_name profile.avt')
            .sort({ createdAt: 'asc' });

        // Render dữ liệu bài viết với các tham số cần thiết
        res.render('Detail-post/post', {
            title: post.post_quote || 'Photo posted by ' + post.user_id.profile.display_name,
            header: 'Thread',
            refreshItems: null,
            selectedItem: null,
            userid: req.user._id,
            username: req.user.profile.display_name,
            avatarSrc: req.user.profile.avt,
            post: post,
            comments: comment,
        });
    } catch (error) {
        console.error('Error retrieving post:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = post1Controller;
