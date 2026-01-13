const configJson = require("./config.json");
require("dotenv").config();

function replaceEnv(config){
    for(let key in config){
        if(config[key] && typeof config[key] === "object" && !Array.isArray(config[key])){
            if(config[key].env){
                config[key] = process.env[config[key].env]
            }
            else{
                config[key] = replaceEnv(config[key]);
            }
        }
    }
    return config;
}

let mergedConfig = replaceEnv(configJson);
module.exports = mergedConfig;
