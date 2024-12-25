const Post = require('../Models/Post'); // Import model Post
const Notification = require('../Models/Notification'); // Import model Notification
const User = require('../Models/User'); // Import model User
let homeController = {};

homeController.renderHome = async (req, res) => {
    const posts = await Post.find().populate('user_id', 'profile').sort({ createdAt: -1 });
    const unreadCount = await Notification.countDocuments({
        user_id: req.userId,
        is_read: false,
    });
    const users = await User.find({
        _id: { $nin: [...req.user.following, req.user._id] },
    }).limit(10);
    const title = `${unreadCount > 0 ? `(${unreadCount}) ` : ''}Mini Threads`;
    res.render('home/home', {
        title,
        header: 'Home',
        refreshItems: [
            { name: 'For you', link: '/' },
            { name: 'Following', link: '/home/following' },
            { name: 'Liked', link: '/home/liked' },
        ],
        selectedItem: 'For you',
        userid: req.user._id,
        username: req.user.profile.nick_name,
        avatarSrc: req.user.profile.avt,
        posts: posts,
        users,
        unreadCount,
    });
};

homeController.filterFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('following').populate('following', 'profile');
        if (!user) {
            return res.status(404).send('User not found');
        }

        const followingUserIds = user.following.map((followedUser) => followedUser._id);

        const posts = await Post.find({ user_id: { $in: followingUserIds } })
            .populate('user_id', 'profile.nick_name profile.avt')
            .sort({ createdAt: -1 });

        const unreadCount = await Notification.countDocuments({
            user_id: req.userId,
            is_read: false,
        });

        const users = await User.find({
            _id: { $nin: [...req.user.following, req.user._id] },
        }).limit(10);
        const title = `${unreadCount > 0 ? `(${unreadCount}) ` : ''}Mini Threads - Following`;

        res.render('home/home', {
            title,
            header: 'Following',
            refreshItems: [
                { name: 'For you', link: '/' },
                { name: 'Following', link: '/home/following' },
                { name: 'Liked', link: '/home/liked' },
            ],
            selectedItem: 'Following',
            userid: req.user._id,
            username: req.user.profile.nick_name,
            avatarSrc: req.user.profile.avt,
            posts: posts,
            users: users,
            unreadCount,
        });
    } catch (error) {
        console.error('Error fetching following posts:', error);
        res.status(500).send('Internal Server Error');
    }
};

homeController.filterLiked = async (req, res) => {
    try {
        // Lấy bài viết đã được user hiện tại like
        const posts = await Post.find({ post_likes: req.user._id }) // Assume 'liked' là mảng chứa userId
            .populate('user_id', 'profile')
            .sort({ createdAt: -1 });
        const unreadCount = await Notification.countDocuments({
            user_id: req.userId,
            is_read: false,
        });
        const users = await User.find({
            _id: { $nin: [...req.user.following, req.user._id] },
        }).limit(10);
        const title = `${unreadCount > 0 ? `(${unreadCount}) ` : ''}Mini Threads - Liked`;

        res.render('home/home', {
            title,
            header: 'Liked',
            refreshItems: [
                { name: 'For you', link: '/' },
                { name: 'Following', link: '/home/following' },
                { name: 'Liked', link: '/home/liked' },
            ],
            selectedItem: 'Liked',
            userid: req.user._id,
            username: req.user.profile.nick_name,
            avatarSrc: req.user.profile.avt,
            posts: posts,
            users,
            unreadCount,
        });
    } catch (error) {
        console.error('Error fetching liked posts:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = homeController;
