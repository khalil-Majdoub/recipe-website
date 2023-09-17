const express = require('express');
const router = express.Router();
const Refresh = require('../../controllers/loginController').Refresh

router.post('/', Refresh);

module.exports = router;