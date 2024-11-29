const express = require("express");
const router = express.Router();
const profileController = require("../Controllers/profileController");
const middlewareController = require("../Controllers/middlewareController");
// Route cho trang Home
router.get("/", profileController);

module.exports = router;
