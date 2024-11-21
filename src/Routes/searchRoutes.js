const express = require('express');
const router = express.Router();
const searchController = require('../Controllers/searchController');

// Route cho trang Search
router.get('/', searchController);

module.exports = router;
