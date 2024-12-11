const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.refreshToken;
    if (!token) next(); // Unauthorized

    jwt.verify(token, process.env.JWT_REFRESH_KEY, (err, user) => {
        console.log(err);
        if (err) {
            console.log('Some thing wrong with token');
            return res.sendStatus(403);
        } // Forbidden
        req.userId = user.id;
        next();
    });
};

module.exports = authenticateToken;
