const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/registerController');

router.get('/login',registerController.handleLogin )
