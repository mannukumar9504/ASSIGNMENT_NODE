const express = require('express');
const router = express.Router();
const { registerUser, loginUser, passwordReset } = require('./auth.controller');
/**
 * used for request param validation
 */
const { loginValidation,registerValidation } = require("./auth.validator");
const { validate } = require('express-validation');

router.post('/register/user', validate(registerValidation), registerUser);
router.post('/login', validate(loginValidation) ,loginUser);
router.post('/reset-password', passwordReset);

module.exports = router;