const express = require('express');
const { getUsers, getUser, updateUser, deleteUser, changePassword } = require('../controllers/userController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, adminAuth, getUsers);
router.get('/:id', auth, getUser);
router.put('/:id', auth, updateUser);
router.put('/change-password', auth, changePassword);
router.delete('/:id', auth, adminAuth, deleteUser);

module.exports = router;