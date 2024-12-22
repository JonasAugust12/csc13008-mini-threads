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
router.post('/newpost', upload.single('post_image'), authenticateToken, post1Controller.createPost);
router.post('/like/:id', authenticateToken, post1Controller.likePost);
router.post('/comment', authenticateToken, upload.single('post_image'), post1Controller.createComment);
router.post('/like-comment/:id', authenticateToken, post1Controller.likeComment);
router.post('/delete/:id', authenticateToken, post1Controller.deletePost);
router.post('/delete-comment/:id', authenticateToken, post1Controller.deleteComment);
module.exports = router;
