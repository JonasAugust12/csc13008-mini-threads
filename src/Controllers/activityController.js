const dummyPosts = [
    {
        type: 'follows',
        username: 'justinbieber',
        avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
        timestamp: '34m',
        tag: 'Followed you',
    },
    {
        type: 'likes',
        username: 'justinbieber',
        avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
        timestamp: '12m',
        tag: 'CSC13008-Mini-Threads',
    },
    {
        type: 'replies',
        username: 'justinbieber',
        avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
        timestamp: '2h',
        tag: 'CSC13008-Mini-Threads',
        reply: {
            content: 'Biber em fan anh',
            like: 20,
            comment: 30,
        },
    },
];

const activityController = (req, res) => {
    const username = req.session.username || 'Guest';
    const selectedItem = req.params.type || 'All'; // Lấy tham số type từ URL
    let posts = dummyPosts;
    if (selectedItem !== 'All') {
        posts = dummyPosts.filter((post) => post.type === selectedItem);
    }
    let header = selectedItem === 'All' ? 'Activity' : selectedItem.charAt(0).toUpperCase() + selectedItem.slice(1).toLowerCase();
    res.render('Activity/activity', {
        title: 'Activity',
        header,
        refreshItems: [
            { name: 'All', link: '/activity' },
            { name: 'Follows', link: '/activity/follows' },
            { name: 'Likes', link: '/activity/likes' },
            { name: 'Replies', link: '/activity/replies' },
        ],
        selectedItem: selectedItem,
        username: username,
        avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
        posts: posts,
    });
};

module.exports = activityController;
