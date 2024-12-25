const User = require('../Models/User');
const Follow = require('../Models/Follow');
const Notification = require('../Models/Notification');

const searchController = async (req, res) => {
    try {
        const query = req.query.q ? req.query.q.toLowerCase() : '';
        const userId = req.userId || null;

        let filteredUsers = [];

        if (query) {
            filteredUsers = await User.find({
                $or: [{ username: { $regex: query, $options: 'i' } }, { fullname: { $regex: query, $options: 'i' } }],
            }).select('username fullname profile.avt followers');
        } else {
            filteredUsers = await User.find().select('username fullname profile.avt followers');
        }

        if (userId) {
            const follows = await Follow.find({ followerId: userId }).populate('userId');
            const followingIds = follows.map((follow) => follow.userId?._id?.toString());

            filteredUsers = filteredUsers.map((user) => ({
                ...user.toObject(),
                isFollowing: followingIds.includes(user._id.toString()),
                followers_count: user.followers.length,
            }));
        }

        const unreadCount = userId ? await Notification.countDocuments({ user_id: userId, is_read: false }) : 0;

        const title = `${unreadCount > 0 ? `(${unreadCount}) ` : ''}Search`;

        res.render('Search/search', {
            title,
            header: 'Search',
            refreshItems: null,
            selectedItem: null,
            username: req.username || null,
            avatarSrc: req.avatarSrc || null,
            users: filteredUsers,
            query,
            unreadCount,
            curUserId: userId,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('An error occurred while fetching users.');
    }
};

module.exports = searchController;
