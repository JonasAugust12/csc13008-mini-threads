const posts = require('../data/posts');

// Danh sách người theo dõi giả lập
const followerUsers = [
    {
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        username: 'user1',
        name: 'User 1',
        followers: Math.floor(Math.random() * 10000),
    },
    {
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        username: 'user2',
        name: 'User 2',
        followers: Math.floor(Math.random() * 10000),
    },
    {
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        username: 'user3',
        name: 'User 3',
        followers: Math.floor(Math.random() * 10000),
    },
    {
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        username: 'user4',
        name: 'User 4',
        followers: Math.floor(Math.random() * 10000),
    },
];

// Dữ liệu người dùng giả lập (sử dụng dữ liệu từ cơ sở dữ liệu trong thực tế)
const user = {
    avatar: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
    name: 'Minh Toàn',
    nickname: 'cas.nothingtosay',
    bio: 'Vietnamese gang',
};

const postController = (req, res) => {
    const username = req.session.username || 'Guest';

    if (req.method === 'POST') {
        const { post_quote } = req.body;

        // Lấy đường dẫn ảnh từ req.file
        const uploadedImage = req.file ? `/uploads/${req.file.filename}` : null;

        const newPost = {
            user: {
                username: 'justinbieber',
                user_display_name: 'Justin Bieber',
                user_nick_name: 'Pdiddy',
                user_bio: 'i love fried chicken',
                avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
                user_profile_link: '/profile/justinbieber',
                user_followers_count: 1000000,
            },
            createdAt: 'just now',
            post_quote: post_quote || 'No content',
            post_images: uploadedImage ? [uploadedImage] : [], // Lưu đường dẫn ảnh vào mảng nếu có
            post_likes: [],
            post_comments: [],
            post_repost: [],
        };

        posts.unshift(newPost); // Thêm bài đăng mới vào mảng
        console.log('New post added:', newPost); // Debug
        return res.json(newPost); // Gửi lại bài đăng vừa thêm cho client
    }

    res.status(400).json({ error: 'Invalid request method' });
};

module.exports = postController;
