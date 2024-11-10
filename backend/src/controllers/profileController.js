exports.getProfile = (req, res) => {
    const content = req.query.content || 'profile_post.ejs';
    res.render('profile', {
        title: 'Profile',
        //
        body_content: content,
    });
};
exports.getUserProfile = (req, res) => {
    res.render('user_profile', {
        title: 'Profile12',
        //
        body_content: 'profile_post.ejs',
    });
};
