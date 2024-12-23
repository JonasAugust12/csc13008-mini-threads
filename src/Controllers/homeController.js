const Follow = require('../Models/Follow'); // Import model Follow
const Post1 = require('../Models/Post1'); // Import model Post1
const Notification = require('../Models/Notification'); // Import model Notification
const User = require('../Models/User'); // Import model User
let homeController = {};

homeController.renderHome = async (req, res) => {
    const posts = await Post1.find().populate('user_id', 'profile').sort({ createdAt: -1 });
    const unreadCount = await Notification.countDocuments({
        user_id: req.userId,
        is_read: false,
    });
    const users = await User.find().select('username user_display_name avatarSrc user_followers_count').limit(5);
    res.render('home/home', {
        title: 'Mini Threads',
        header: 'Home',
        refreshItems: [
            { name: 'For you', link: '/' },
            { name: 'Following', link: '/home/following' },
            { name: 'Liked', link: '/home/liked' },
        ],
        selectedItem: 'For you',
        userid: req.user._id,
        username: req.user.profile.display_name,
        avatarSrc: req.user.profile.avt,
        posts: posts,
        users,
        unreadCount,
    });
};

homeController.filterFollowing = async (req, res) => {
    try {
        // Lấy danh sách user mà user hiện tại đang follow
        const followingUsers = await Follow.find({ followerId: req.user._id }).select('userId');
        const followingUserIds = followingUsers.map((follow) => follow.userId);

        // Lấy bài viết từ những người được follow
        const posts = await Post1.find({ user_id: { $in: followingUserIds } })
            .populate('user_id', 'profile')
            .sort({ createdAt: -1 });
        const unreadCount = await Notification.countDocuments({
            user_id: req.userId,
            is_read: false,
        });
        const users = await User.find().select('username user_display_name avatarSrc user_followers_count').limit(5);

        res.render('home/home', {
            title: 'Mini Threads - Following',
            header: 'Following',
            refreshItems: [
                { name: 'For you', link: '/' },
                { name: 'Following', link: '/home/following' },
                { name: 'Liked', link: '/home/liked' },
            ],
            selectedItem: 'Following',
            userid: req.user._id,
            username: req.user.profile.display_name,
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
        const posts = await Post1.find({ post_likes: req.user._id }) // Assume 'liked' là mảng chứa userId
            .populate('user_id', 'profile')
            .sort({ createdAt: -1 });
        const unreadCount = await Notification.countDocuments({
            user_id: req.userId,
            is_read: false,
        });
        const users = await User.find().select('username user_display_name avatarSrc user_followers_count').limit(5);

        res.render('home/home', {
            title: 'Mini Threads - Liked',
            header: 'Liked',
            refreshItems: [
                { name: 'For you', link: '/' },
                { name: 'Following', link: '/home/following' },
                { name: 'Liked', link: '/home/liked' },
            ],
            selectedItem: 'Liked',
            userid: req.user._id,
            username: req.user.profile.display_name,
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
