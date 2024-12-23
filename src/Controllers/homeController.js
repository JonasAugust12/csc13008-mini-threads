const Follow = require('../Models/Follow'); // Import model Follow
const Post1 = require('../Models/Post1'); // Import model Post1
const Notification = require('../Models/Notification'); // Import model Notification

// Data dùng cho suggestion user
const dummyUsers = [
    {
        username: 'justinbieber',
        user_display_name: 'Justin Bieber',
        user_nick_name: 'Pdiddy',
        user_bio: 'i love fried chicken',
        avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
        user_profile_link: 'src/Public/Pages/another_user.html',
        user_followers_count: 1000000,
    },
    {
        username: 'Katy Pery',
        user_display_name: 'Katy Pery',
        user_nick_name: 'ROARRR',
        user_bio: 'Orlando Bloom is my husband',
        avatarSrc: 'https://randomuser.me/api/portraits/men/1.jpg',
        user_profile_link: 'src/Public/Pages/another_user.html',
        user_followers_count: 1000000,
    },
    {
        username: 'justinbieber',
        user_display_name: 'Justin Bieber',
        user_nick_name: 'Pdiddy',
        user_bio: 'i love fried chicken',
        avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
        user_profile_link: 'src/Public/Pages/another_user.html',
        user_followers_count: 1000000,
    },
    {
        username: 'Katy Pery',
        user_display_name: 'Katy Pery',
        user_nick_name: 'ROARRR',
        user_bio: 'Orlando Bloom is my husband',
        avatarSrc: 'https://randomuser.me/api/portraits/men/1.jpg',
        user_profile_link: 'src/Public/Pages/another_user.html',
        user_followers_count: 1000000,
    },
];
let homeController = {};

homeController.renderHome = async (req, res) => {
    const posts = await Post1.find().populate('user_id', 'profile').sort({ createdAt: -1 });
    const unreadCount = await Notification.countDocuments({
        user_id: req.userId,
        is_read: false,
    });
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
        users: dummyUsers,
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
            users: dummyUsers,
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
            users: dummyUsers,
            unreadCount,
        });
    } catch (error) {
        console.error('Error fetching liked posts:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = homeController;
