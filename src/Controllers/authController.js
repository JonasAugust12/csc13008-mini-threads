const loginController = (req, res) => {
    res.render('login', { layout: false });
};

const signupController = (req, res) => {
    res.render('signup', { layout: false });
};

module.exports = {
    loginController,
    signupController,
};
