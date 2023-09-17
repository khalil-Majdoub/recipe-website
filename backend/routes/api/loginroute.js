const express = require('express');
const router = express.Router();
const LoginController = require('../../controllers/loginController').LoginController

router.post('/login', LoginController);

module.exports = router;

