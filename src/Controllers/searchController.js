const User = require('../Models/User');
const Follow = require('../Models/Follow');

const searchController = async (req, res) => {
    try {
        const query = req.query.q ? req.query.q.toLowerCase() : '';
        const userId = req.userId;

        let filteredUsers = [];

        if (query) {
            filteredUsers = await User.find({
                $or: [{ username: { $regex: query, $options: 'i' } }, { fullname: { $regex: query, $options: 'i' } }],
            }).select('username fullname profile.avt followers_count');
        } else {
            filteredUsers = await User.find().select('username fullname profile.avt followers_count');
        }

        if (userId) {
            const follows = await Follow.find({ followerId: userId }).populate('userId');
            const followingIds = follows.map((follow) => follow.userId._id.toString());

            // Cập nhật thông tin follow cho từng người dùng trong kết quả tìm kiếm
            filteredUsers = filteredUsers.map((user) => {
                return {
                    ...user.toObject(),
                    isFollowing: followingIds.includes(user._id.toString()),
                };
            });
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
