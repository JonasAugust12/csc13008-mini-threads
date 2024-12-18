const User = require('../Models/User');
const Post = require('../Models/Post');
const Follow = require('../Models/Follow');

const homeController = async (req, res) => {
    try {
        let user = null;
        let userId = null;
        let username = '';
        let avatarSrc = '/Img/UserIcon.jpg';

        if (req.userId) {
            userId = req.userId;
            user = await User.findById(userId);
            if (user) {
                username = user.username;
                avatarSrc = user.profile && user.profile.avt ? user.profile.avt : avatarSrc;
            }
        }

        const selectedItem = req.params.type || 'for you';
        const headerText = selectedItem
            .split('-')
            .map((word) => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(' ');

        let posts;

        if (selectedItem === 'following') {
            console.log(userId);

            // Lấy danh sách người dùng mà người dùng hiện tại đang theo dõi
            const following = await Follow.find({ followerId: userId }).populate('userId');
            const followingIds = following.map((follow) => follow.userId._id);
            console.log('User is following the following userIds: ', followingIds);

            // Kiểm tra nếu không có người nào được theo dõi
            if (followingIds.length === 0) {
                posts = [];
            } else {
                // Lấy các user tương ứng với các followingIds
                const followingUsers = await User.find({ _id: { $in: followingIds } }).select('username');
                const followingUsernames = followingUsers.map((user) => user.username);
                console.log("Following users' usernames: ", followingUsernames);

                // Lấy các bài đăng từ những người mà người dùng đang theo dõi
                posts = await Post.find({ 'user.username': { $in: followingUsernames } })
                    .populate('user', 'username user_display_name avatarSrc user_followers_count')
                    .sort({ createdAt: -1 });
            }
            console.log('Posts of followed users: ', posts);
        } else {
            // Nếu không phải 'following', lấy tất cả bài đăng
            posts = await Post.find().populate('user', 'username user_display_name avatarSrc user_followers_count').sort({ createdAt: -1 });
        }

        const users = await User.find().select('username user_display_name avatarSrc user_followers_count').limit(5);

        res.render('home/home', {
            title: 'Mini Threads',
            header: headerText,
            refreshItems: [
                { name: 'For you', link: '/home/for-you' },
                { name: 'Following', link: '/home/following' },
                { name: 'Liked', link: '/home/liked' },
                { name: 'Saved', link: '/home/saved' },
            ],
            selectedItem: selectedItem,
            username: username,
            avatarSrc: avatarSrc,
            posts: posts,
            users: users,
            curUserId: userId,
        });
    } catch (error) {
        console.error('Error fetching posts or users:', error);
        res.status(500).send('An error occurred while fetching posts or users.');
    }
};

module.exports = homeController;
