const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const middleware = require("../business/api")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/v1/register", middleware.register);
router.post("/v1/register", middleware.login);
router.get("/v1/profile", middleware.profile);
router.post("/v1/refresh", middleware.refresh);
router.get("/v1/logout", middleware.logout);