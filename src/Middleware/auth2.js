const jwt = require('jsonwebtoken');
const authenticateToken2 = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Token: ', token);
    if (token == null) {
        return res.status(401).json({ message: 'Unauthorized' }); // Nếu không có token, trả về 401 Unauthorized
    }

    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: err }); // Nếu token không hợp lệ, trả về 403 Forbidden
        }

        req.userId = user.id;
        console.log('hop le');
        next(); // Tiếp tục xử lý yêu cầu
    });
};

module.exports = authenticateToken2;
