const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/registerController');

// Define the route to handle the signup POST request
router.post('/', registerController.handleNewUser);

module.exports = router;

