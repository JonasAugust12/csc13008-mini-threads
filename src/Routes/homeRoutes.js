const express = require("express");
const router = express.Router();
const homeController = require("../Controllers/homeController");
const authenticateToken = require("../Middleware/auth");

router.get("/", homeController);
router.get("/home/:type", authenticateToken, homeController);

module.exports = router;
