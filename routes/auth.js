const express = require("express");
const router = express.Router();

const { test } = require("../controllers/authController");

router.post("/signup", test);
router.post("/singin");

module.exports = router;
