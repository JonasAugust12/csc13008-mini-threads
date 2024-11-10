exports.getProfile = (req, res) => {
    const content = req.query.content || 'profile_post.ejs';
    res.render('profile', {
        title: 'Profile',
        //
        body_content: content,
    });
};
