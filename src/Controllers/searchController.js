const Notification = require('../Models/Notification');

const dummyUsers = [
    {
        username: '_budu.official',
        name: 'FAMILY_DUBUDUBU',
        followers: 4500004,
        avatar: 'https://i.pinimg.com/736x/4a/99/fc/4a99fc60caf04e2ec45c75c99f2f7615.jpg',
    },
    {
        username: 'john_doe',
        name: 'John Doe',
        followers: 7653,
        avatar: 'https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg',
    },
    {
        username: 'jane_smith',
        name: 'Jane Smith',
        followers: 345789,
        avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg',
    },
];

const searchController = async (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    const filteredUsers = dummyUsers.filter((user) => user.username.toLowerCase().includes(query) || user.name.toLowerCase().includes(query));
    const username = req.session.username || 'Guest';
    const unreadCount = await Notification.countDocuments({
        user_id: req.userId,
        is_read: false,
    });
    res.render('Search/search', {
        title: 'Search',
        header: 'Search',
        refreshItems: null,
        selectedItem: null,
        username: username,
        avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
        users: filteredUsers,
        query,
        unreadCount,
    });
};

module.exports = searchController;
