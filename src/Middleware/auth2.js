const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const authenticateToken2 = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        console.log('Token:', token);

        // Nếu không có token, trả về 401 Unauthorized
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        // Verify token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_ACCESS_KEY);
        // Gán userId từ token
        req.userId = decoded.id;
        // Kiểm tra xem người dùng có tồn tại không
        const user = await User.findById(req.userId).select('-password -is_verified -verification_sent_at -createdAt -updatedAt');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user; // Gắn thông tin người dùng vào req
        console.log('Token hợp lệ và người dùng tồn tại');
        next(); // Chuyển sang middleware tiếp theo
    } catch (err) {
        console.error('Authentication error:', err);
        // Xử lý lỗi token hoặc các lỗi khác
        if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token' }); // Token không hợp lệ
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token expired' }); // Token hết hạn
        }
        return res.status(500).json({ message: 'Internal Server Error' }); // Lỗi không mong muốn
    }
};

module.exports = authenticateToken2;
