const express = require('express');
const { registerUser, loginUser, getUserData } = require('../controllers/controllers');
const { verifyToken, logRequests } = require('../helpers/middlewares');
const router = express.Router();


router.use(logRequests);
router.post('/usuarios', registerUser);
router.post('/login', loginUser);
router.get('/usuarios', verifyToken, getUserData);

module.exports = router;
