const User = require('../Models/User');

const searchController = async (req, res) => {
    try {
        const query = req.query.q ? req.query.q.toLowerCase() : '';

        let filteredUsers = [];

        if (query) {
            filteredUsers = await User.find({
                $or: [{ username: { $regex: query, $options: 'i' } }, { fullname: { $regex: query, $options: 'i' } }],
            }).select('username fullname profile.avt followers_count');
        } else {
            filteredUsers = await User.find().select('username fullname profile.avt followers_count');
        }

        res.render('Search/search', {
            title: 'Search',
            header: 'Search',
            refreshItems: null,
            selectedItem: null,
            username: null,
            avatarSrc: null,
            users: filteredUsers,
            query,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('An error occurred while fetching users.');
    }
};

module.exports = searchController;
