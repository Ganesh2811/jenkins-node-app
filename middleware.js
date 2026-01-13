require("dotenv");
const jwt = require("jsonwebtoken");
const tokenValidator = require("./auth/generateToken");
const db = require("./dao/dbConnection")
const config = require("./config");

const accessSecretKey = config.accessKey;
const refreshSecretKey = config.refreshKey;

module.exports.verifyAccessToken = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.sendStatus(401);

    const token = header.split(" ")[1];
    jwt.verify(token, accessSecretKey, (err, user) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
    });
};

module.exports.verifyRefreshToken = (req, res, next, token) => {
    jwt.verify(token, refreshSecretKey, (err, user) => {
        if (err) return res.sendStatus(403);

        refreshTokens = refreshTokens.filter(t => t !== token);

        const newAccess = tokenValidator.generateAccessToken(user);
        const newRefresh = tokenValidator.generateRefreshToken(user);
        refreshTokens.push(newRefresh);

        res.cookie("refreshToken", newRefresh, {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });

        res.json({ accessToken: newAccess });
    });
}

module.exports.daoMiddleware = async (req, res, next) => {
    req.db = await db.getConnection();
    res.on("finish", function(){
        db.releaseConnection(req.db);
    })
}