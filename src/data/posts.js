// Mảng posts giả lập
let posts = [
    {
        user: {
            username: 'justinbieber',
            user_display_name: 'Justin Bieber',
            user_nick_name: 'Pdiddy',
            user_bio: 'i love fried chicken',
            avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
            user_profile_link: '/profile/justinbieber',
            user_followers_count: 1000000,
        },
        createdAt: '34m',
        post_quote: 'Followed you',
        post_images: [
            'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
            'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
        ],
        post_likes: [3, 2, 9, 6],
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
            user_profile_link: '/profile/justinbieber',
            user_followers_count: 1000000,
        },
        createdAt: '12m',
        post_quote: 'CSC13008-Mini-Threads',
        post_images: ['https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png'],
        post_likes: [3, 2],
        post_comments: [1],
        post_repost: [1],
    },
    // Thêm các post giả lập khác
];

module.exports = posts;
