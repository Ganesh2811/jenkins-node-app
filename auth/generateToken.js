require("dotenv");
const jwt = require("jsonwebtoken");
const config = require("../config")

const accessSecretKey = config?.accessKey;
const refreshSecretKey = config?.refreshKey;

module.exports.generateAccessToken = (user) => jwt.sign({ id: user.id }, accessSecretKey, { expiresIn: "15m" });

module.exports.generateRefreshToken = (user) => jwt.sign({ id: user.id }, refreshSecretKey, { expiresIn: "7d" });