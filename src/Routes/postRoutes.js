const express = require('express');
const router = express.Router();
const postController = require('../Controllers/postController');
const post1Controller = require('../Controllers/post1Controller');
const authenticateToken = require('../Middleware/auth');
const upload = require('../Middleware/multer');

// Route to get all posts (Home page or main feed)
router.get('/:id', authenticateToken, post1Controller.renderpost);

// Route to create a new post
router.post('/newpost', upload.single('post_image'), authenticateToken, post1Controller.createPost);
router.post('/newcomment', authenticateToken, upload.single('post_image'), post1Controller.createComment);
router.post('/like-post/:id', authenticateToken, post1Controller.likePost);
router.post('/like-comment/:id', authenticateToken, post1Controller.likeComment);
router.delete('/delete-post/:id', authenticateToken, post1Controller.deletePost);
router.delete('/delete-comment/:id', authenticateToken, post1Controller.deleteComment);
module.exports = router;
