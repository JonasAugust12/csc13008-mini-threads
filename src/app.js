// src/app.js
const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Kết nối database -> thành công -> print success
dotenv.config();

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        // thành công
        console.log('SUCCESSFULLY CONNECTED TO MONGO DB');
    } catch (error) {
        console.error('FAILED TO CONNECT TO MONGO DB', error);
    }
};

connectToMongo();

connectToMongo();
const app = express();

// Cors config
const corsOptions = {
    origin: process.env.API_URL || 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOptions));

// Import các routes
const searchRoutes = require('./Routes/searchRoutes');
const homeRoutes = require('./Routes/homeRoutes');
const activityRoutes = require('./Routes/activityRoutes');
const authRoutes = require('./Routes/authRoutes');
const profileRoutes = require('./Routes/profileRoutes');
const postRoutes = require('./Routes/postRoutes');
const uploadRoutes = require('./Routes/uploadRoutes');

// Cài đặt view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware session
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
    }),
);

app.use(ejsLayouts);

app.use(express.static(path.join(__dirname, './Public')));

// Cài đặt các routes
app.use('/search', searchRoutes);
app.use('/', homeRoutes); // Đường dẫn '/' cho trang home
app.use('/activity', activityRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/post', postRoutes);
app.use('/upload', uploadRoutes);
// // Route chính để hiển thị layout
// app.get('/', (req, res) => {
//     const username = req.session.username || 'Guest';
//     res.render('layout', {
//         title: 'Mini Threads',
//         body: '',
//         header: '',
//         username: username,
//         avatarSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
//         refreshItems: null,
//     });
// });

// Khởi động server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
