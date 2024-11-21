const activityController = (req, res) => {
    const username = req.session.username || 'Guest';
    res.render('layout', {
        title: 'Mini Threads',
        body: '',
        header: 'Activity',
        refreshItems: [
            { name: 'All', link: '/activity/all' },
            { name: 'Follows', link: '/activity/follows' },
            { name: 'Like', link: '/activity/like' },
            { name: 'Replies', link: '/activity/replies' },
        ],
        selectedItem: 'All',
        username: username,
        avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
    });
};

module.exports = activityController;
