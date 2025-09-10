const express = require("express");
const { registerUser, loginUser,getProfile } = require("../controllers/authController");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

router.get("/profile", auth, getProfile);

module.exports = router;
