const express = require('express');
const router1 = express.Router();
const LoginController = require('../../controllers/loginController').LoginController

router1.post('/login', LoginController);

module.exports = router1;

