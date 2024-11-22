const { comment } = require('postcss');
const { head } = require('../Routes/searchRoutes');

const dummyMainPost = {
    userName: 'justinbieber',
    avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
    timestamp: '34m',
    content: {
        quote: 'This is a sample post. Welcome to Simple Threads!',
        images: [
            'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
            'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
        ],
    },
    likes: 20,
    comments: 30,
    permissions: 'followers',
    isFirstPost: true,
    // userID: "user12345",
    // createdAt: new Date().toISOString(),
    // likes: ["user23456", "user34567", "user45678"],
    // comments: ["comment123", "comment456", "comment789"],
};

const dummyComments = [
    {
        userName: 'justinbieber',
        avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
        timestamp: '34m',
        content: {
            quote: 'This is a sample post. Welcome to Simple Threads!',
            images: [
                'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
                'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
            ],
        },
        likes: 20,
    },
    {
        userName: 'justinbieber',
        avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
        timestamp: '34m',
        content: {
            quote: 'This is a sample post. Welcome to Simple Threads!',
            images: [
                'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
                'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
            ],
        },
        likes: 20,
    },
    {
        userName: 'justinbieber',
        avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
        timestamp: '34m',
        content: {
            quote: 'This is a sample post. Welcome to Simple Threads!',
            images: [
                'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
                'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
            ],
        },
        likes: 20,
    },
    {
        userName: 'justinbieber',
        avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
        timestamp: '34m',
        content: {
            quote: 'This is a sample post. Welcome to Simple Threads!',
            images: [],
        },
        likes: 20,
    },
];

const postController = (req, res) => {
    const username = req.session.username || 'Guest';
    //const { postID } = req.params;
    res.render('Detail-post/post', {
        title: 'Post',
        header: 'Thread',
        refreshItems: [],
        selectedItem: null,
        username,
        avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
        mainPost: dummyMainPost,
        replies: dummyComments,
    });
};

module.exports = postController;
