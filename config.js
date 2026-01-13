const dotenv = require("dotenv");
const configJson = require("./config.json");

dotenv.config();

const config = {
    port: configJson.port,
    accessKey: process.env[configJson.accessKey.env],
    refreshKey: process.env[configJson.refreshKey.env]
};

// Safety check (VERY IMPORTANT)
if (!config.accessKey || !config.refreshKey) {
    throw new Error("Missing environment variables for JWT keys");
}

module.exports = config;
