const Notification = require('../Models/Notification');

const activityController = async (req, res) => {
    try {
        const noti = await Notification.find({ user_id: req.userId })
            .populate('action_user_id', 'profile.display_name profile.avt')
            .populate('post_id', 'post_image post_quote')
            .populate('comment_id', 'comment_content comment_likes comment_image')
            .sort({ createdAt: -1 });

        const typeMapping = {
            all: 'all',
            follows: 'follow',
            likes: 'like',
            replies: 'comment',
        };

        const selectedItem = typeMapping[(req.params.type || 'all').toLowerCase()] || 'all';

        const filteredNoti =
            selectedItem === 'all' ? sortedNoti : sortedNoti.filter((notification) => notification.type.toLowerCase() === selectedItem);

        const headerMapping = {
            all: 'Activity',
            follow: 'Follows',
            like: 'Likes',
            comment: 'Replies',
        };

        const header = headerMapping[selectedItem] || 'Activity';

        res.render('Activity/activity', {
            title: 'Activity',
            header,
            refreshItems: [
                { name: 'All', link: '/activity', type: 'all' },
                { name: 'Follows', link: '/activity/follows', type: 'follow' },
                { name: 'Likes', link: '/activity/likes', type: 'like' },
                { name: 'Replies', link: '/activity/replies', type: 'comment' },
            ],
            selectedItem,
            userid: req.user._id,
            username: req.user.profile.display_name,
            avatarSrc: req.user.profile.avt,
            notifications: filteredNoti,
        });
    } catch (error) {
        console.error('Error in activityController:', error.message, error.stack);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = activityController;
