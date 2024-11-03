const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const searchRoutes = require('./routes/searchRoutes');
const { title } = require('process');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(ejsLayouts); 

app.use(express.static(path.join(__dirname, '../../frontend/src')));

// Cài đặt route
app.use('/search', searchRoutes);

// Route chính để hiển thị layout
app.get('/', (req, res) => {
    res.render('layout', {
      title: 'Mini Threads',
      body: ''
  });
});

app.get('/login', (req, res) => {
  res.render('login', {
    layout: false
  });
});

// Khởi động server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

