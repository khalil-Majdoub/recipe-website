const express = require('express');
const router1 = express.Router();
const LoginController = require('../../controllers/loginController')

router1.get('/login', LoginController);

module.exports = router1;
