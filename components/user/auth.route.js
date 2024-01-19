const express = require('express');
const router = express.Router();
const { registerUser, loginUser, passwordReset } = require('./auth.controller');

router.post('/register/user', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', passwordReset);

module.exports = router;