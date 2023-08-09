const express = require('express');
const routers = express.Router();
const registerController = require("../../controllers/registerController");

routers.get("/check", registerController.handleDuplicateCheck);

module.exports = routers;