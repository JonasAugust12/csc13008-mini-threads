const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');

// Kết nối với cơ sở dữ liệu MongoDB
dotenv.config();

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('SUCCESSFULLY CONNECTED TO MONGO DB');
    } catch (error) {
        console.error('FAILED TO CONNECT TO MONGO DB', error);
    }
};

connectToMongo();

const app = express();

// Cấu hình CORS để chấp nhận kết nối từ frontend
const corsOptions = {
    origin: process.env.API_URL || 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Cài đặt các middleware
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'Public')));

// Cài đặt EJS view engine và layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(ejsLayouts);

// Cài đặt session
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
    }),
);

// Cấu hình multer để xử lý ảnh
const storage = multer.memoryStorage(); // Lưu ảnh vào bộ nhớ RAM
const upload = multer({ storage });

// Middleware để xử lý ảnh và dữ liệuz văn bản từ FormData
app.use(upload.single('post_image')); // Sử dụng 'post_image' làm tên trường ảnh trong FormData

// Cấu hình các route
const searchRoutes = require('./Routes/searchRoutes');
const homeRoutes = require('./Routes/homeRoutes');
const activityRoutes = require('./Routes/activityRoutes');
const authRoutes = require('./Routes/authRoutes');
const profileRoutes = require('./Routes/profileRoutes');
const postRoutes = require('./Routes/postRoutes');
const uploadRoutes = require('./Routes/uploadRoutes');

// Sử dụng JSON và URL-encoded body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Các route cho trang chủ, tìm kiếm, hoạt động, đăng nhập, hồ sơ và bài viết
app.use('/search', searchRoutes);
app.use('/', homeRoutes);
app.use('/activity', activityRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/post', postRoutes); // Đảm bảo routes này có thể xử lý yêu cầu gửi bài viết
app.use('/upload', uploadRoutes);
// const upload = require('./Middleware/multer');
// app.use('/upload', upload.single('post_image')); // Middleware xử lý ảnh

// Route chính để hiển thị layout
app.get('/', (req, res) => {
    const username = req.session.username || 'Guest';
    res.render('layout', {
        title: 'Mini Threads',
        body: '',
        header: '',
        username: username,
        avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
    });
});

// Khởi động server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
