const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');

router.post('/user/:id', userProfileController.getUserDetails);

module.exports = router;  