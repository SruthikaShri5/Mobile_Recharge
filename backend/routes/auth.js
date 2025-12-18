const express = require('express');
const { register, login, checkUnique } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/check-unique', checkUnique);

module.exports = router;