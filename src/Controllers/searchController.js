const searchController = (req, res) => {
    const username = req.session.username || 'Guest';
    res.render('layout', {
        title: 'Search',
        body: '',
        header: 'Search',
        refreshItems: null,
        selectedItem: 'For you',
        username: username,
        avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
    });
};

module.exports = searchController;
