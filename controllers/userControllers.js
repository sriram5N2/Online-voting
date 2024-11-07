const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const currentUser = await User.findOne({ email });
    if (currentUser && (await currentUser.matchPassword(password))) {
        res.json({
            _id: currentUser._id,
            email: currentUser.email,
            token: generateToken(currentUser._id),
        });
    } else {
        res.status(401);
        throw new Error("Check your login credentials");
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (!email || !password) {
        res.status(400);
        throw new Error("Enter all the fields");
    } else if (userExists) {
        res.status(400);
        throw new Error("User exists");
    } else if (password.length < 8) {
        res.status(400);
        throw new Error("Password is less than 8 characters");
    }
    const newUser = await User.create({
        email,
        password,
    });

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            token: generateToken(newUser._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to create user");
    }
});

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;

    try {
        const secret = speakeasy.generateSecret({ length: 20 });
        const otp = speakeasy.totp({
            secret: secret.base32,
            encoding: "base32",
            step: 30,
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "VoteEasy OTP Code",
            text: `Your OTP code is: ${otp}`,
        };
        transporter.sendMail(mailOptions);
        res.json({ message: "OTP sent", secret: secret.base32 });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500);
        throw new Error("Check your credentials");
    }
});

const verifyOtp = asyncHandler(async (req, res) => {
    const { otp, hash } = req.body;

    const verified = speakeasy.totp.verify({
        secret: hash,
        encoding: "base32",
        token: otp,
        window: 1,
    });

    if (verified) {
        res.json({ message: "OTP verified" });
    } else {
        res.status(400);
        throw new Error("Invalid OTP");
    }
});

module.exports = { registerUser, authUser, sendOtp, verifyOtp };
