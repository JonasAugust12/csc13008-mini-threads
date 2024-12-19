const User = require('../Models/User');
const Post1 = require('../Models/Post1');
const path = require('path');

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

const homeController = async (req, res) => {
    const posts = await Post1.find().populate('user_id', 'profile').exec();

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
        userid: req.user._id,
        username: req.user.profile.display_name,
        avatarSrc: req.user.profile.avt,
        posts: posts,
        users: dummyUsers,
    });
};

module.exports = homeController;
