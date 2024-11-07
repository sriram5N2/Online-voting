const express = require("express");
const {
    authUser,
    registerUser,
    sendOtp,
    verifyOtp,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/signup", registerUser);
router.post("/login", authUser);

module.exports = router;
