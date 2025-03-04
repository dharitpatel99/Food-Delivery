const express = require('express');
const {loginUser,registerUser,changePassword} = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/change-password',authMiddleware,changePassword);

module.exports = router;