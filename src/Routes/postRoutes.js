const express = require('express');
const router = express.Router();
const postController = require('../Controllers/postController');
const post1Controller = require('../Controllers/post1Controller');
const authenticateToken = require('../Middleware/auth');
const upload = require('../Middleware/multer');

// Route to get all posts (Home page or main feed)
router.get('/:id', authenticateToken, post1Controller.renderpost);

// Route to create a new post
router.post('/', authenticateToken, postController);
router.post('/newpost', authenticateToken, post1Controller.createPost);
router.post('/like/:id', authenticateToken, post1Controller.likePost);
router.post('/comment', authenticateToken, post1Controller.createComment);
module.exports = router;
