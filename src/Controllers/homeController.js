const User = require('../Models/User');
const Post = require('../Models/Post');

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
                avatarSrc = user.profile.avt ? user.profile.avt : avatarSrc;
            }
        }

        const posts = await Post.find().populate('user', 'username user_display_name avatarSrc user_followers_count').sort({ createdAt: -1 });

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
