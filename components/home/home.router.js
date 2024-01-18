const express = require('express');
const router = express.Router();
const { getHome, addQuestion } = require('./home.controller');
const { authenticateUser } = require('../../middleware/auth.middleware')

router.get('/home',getHome);
router.post('/question/add', authenticateUser, addQuestion);

module.exports = router;