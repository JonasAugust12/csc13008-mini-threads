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

// Dùng cho các post ở home khi kết nối database có thể tách ra nếu cần ( nhớ sửa các biến trong template hiện tại đang gắn với post hết)
const dummyPosts = [
    {
        user: {
            username: 'justinbieber',
            user_display_name: 'Justin Bieber',
            user_nick_name: 'Pdiddy',
            user_bio: 'i love fried chicken',
            avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
            user_profile_link: 'src/Public/Pages/another_user.html',
            user_followers_count: 1000000,
        },
        createdAt: '34m',
        post_quote: 'Followed you',
        post_images: [
            'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
            'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
            'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
            'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
            'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
        ],
        post_likes: [3, 2, 9, 6, 7, 3, 2, 9, 6, 7, 3, 2, 9, 6, 7],
        post_comments: [1],
        post_repost: [1],
    },
    {
        user: {
            username: 'justinbieber',
            user_display_name: 'Justin Bieber',
            user_nick_name: 'Pdiddy',
            user_bio: 'i love fried chicken',
            avatarSrc: 'https://randomuser.me/api/portraits/men/1.jpg',
            user_profile_link: 'src/Public/Pages/another_user.html',
            user_followers_count: 1000000,
        },
        createdAt: '12m',
        post_quote: 'CSC13008-Mini-Threads',
        post_images: [
            'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
            'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
        ],
        post_likes: [3, 2],
        post_comments: [1],
        post_repost: [1],
    },
    {
        user: {
            username: 'justinbieber',
            user_display_name: 'Justin Bieber',
            user_nick_name: 'Pdiddy',
            user_bio: 'i love fried chicken',
            avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
            user_profile_link: 'src/Public/Pages/another_user.html',
            user_followers_count: 1000000,
        },
        createdAt: '2h',
        post_quote: 'CSC13008-Mini-Threads',
        post_images: ['https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png'],
        post_likes: [3, 2],
        post_comments: [1],
        post_repost: [1],
    },
    {
        user: {
            username: 'justinbieber',
            user_display_name: 'Justin Bieber',
            user_nick_name: 'Pdiddy',
            user_bio: 'i love fried chicken',
            avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
            user_profile_link: 'src/Public/Pages/another_user.html',
            user_followers_count: 1000000,
        },
        createdAt: '2h',
        post_quote: 'CSC13008-Mini-Threads',
        post_images: ['https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png'],
        post_likes: [3, 2],
        post_comments: [1],
        post_repost: [1],
    },
];
const homeController = (req, res) => {
    const username = req.session.username || 'Binh';
    const avatarSrc = req.session.avatarSrc || 'https://randomuser.me/api/portraits/men/1.jpg';

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
        posts: dummyPosts,
        users: dummyUsers,
    });
};

module.exports = homeController;
