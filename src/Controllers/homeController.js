const User = require('../Models/User');
const Post = require('../Models/Post');

const homeController = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).send('Unauthorized');
        }
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const posts = await Post.find().populate('user', 'username user_display_name avatarSrc user_followers_count').sort({ createdAt: -1 }); // Sắp xếp bài đăng mới nhất lên đầu

        const users = await User.find().select('username user_display_name avatarSrc user_followers_count').limit(5);

        res.render('home/home', {
            title: 'Mini Threads',
            header: 'Home',
            refreshItems: [
                { name: 'For you', link: '/home/for-you' },
                { name: 'Following', link: '/home/following' },
                { name: 'Liked', link: '/home/liked' },
                { name: 'Saved', link: '/home/saved' },
            ],
            selectedItem: 'For you',
            username: user.username,
            avatarSrc: user.profile.avt ? user.profile.avt : '/Img/UserIcon.jpg',
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
