const express = require('express');
const router = express.Router();
const postController = require('../Controllers/postController');
const authenticateToken = require('../Middleware/auth');

// Route to get all posts (Home page or main feed)
router.get('/', authenticateToken, postController);

// Route to create a new post
router.post('/', authenticateToken, postController);
module.exports = router;
