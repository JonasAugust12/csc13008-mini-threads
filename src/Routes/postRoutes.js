const express = require('express');
const router = express.Router();
const postController = require('../Controllers/postController');

router.get('/', postController);

module.exports = router;
