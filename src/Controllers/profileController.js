const Post = require('../Models/Post'); // Import the Post model

const profileController = async (req, res) => {
    // Fetch user data (this could be fetched from a database or session in the future)
    const user = {
        avatar: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
        name: 'Minh Toàn',
        nickname: 'cas.nothingtosay',
        bio: 'Vietnamese gang',
    };

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

    // Fetch posts for the current user from MongoDB
    try {
        const posts = await Post.find().sort({ createdAt: -1 }); // Fetch posts and sort by most recent

        // Send the posts and other data to the profile view
        res.render('profile', {
            title: 'Profile',
            header: 'Profile',
            refreshItems: [],
            selectedItem: null,
            username: req.session.username || 'Guest',
            avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
            user: user,
            posts: posts,
            followerUsers: followerUsers,
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

module.exports = profileController;
