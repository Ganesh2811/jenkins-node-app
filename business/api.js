const bcrypt = require("bcryptjs");
const auth = require("../middleware")
const tokenGeneration = require("../auth/generateToken")

module.exports.register = async (req, res) => {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    users.push({ id: users.length + 1, email, password: hashed });
    res.json({ message: "User registered" });
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return res.sendStatus(401);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.sendStatus(401);

    const accessToken =  tokenGeneration.generateAccessToken(user);
    const refreshToken = tokenGeneration.generateRefreshToken(user);

    refreshTokens.push(refreshToken);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    });

    res.json({ accessToken });
}

module.exports.profile = async (req, res, next) => {
    auth.verifyAccessToken(req, res, next);
    res.json({ message: "Protected Profile Data", userId: req.user.id });
}

module.exports.refresh = async (req, res, next) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);
    if (!refreshTokens.includes(token)) return res.sendStatus(403);

    auth.verifyRefreshToken(req, res, next, token);
}

module.exports.logout = async (req, res, next) => {
    const token = req.cookies.refreshToken;
    refreshTokens = refreshTokens.filter(t => t !== token);
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out" });
}
