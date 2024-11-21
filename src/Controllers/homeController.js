const homeController = (req, res) => {
    const username = req.session.username || 'Guest';
    res.render('layout', {
        title: 'Mini Threads',
        body: '',
        header: 'Home',
        refreshItems: [
            { name: 'For you', link: '/home/for-you' },
            { name: 'Following', link: '/home/following' },
            { name: 'Liked', link: '/home/liked' },
            { name: 'Saved', link: '/home/saved' },
        ],
        selectedItem: 'For you',
        username: username,
        avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
    });
};

module.exports = homeController;
