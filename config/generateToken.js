const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret_token = process.env.JWT_SECRET_TOKEN;

const generateToken = (id) => {
    return jwt.sign({ id }, secret_token, {
        expiresIn: "1h",
    });
};

module.exports = generateToken;
