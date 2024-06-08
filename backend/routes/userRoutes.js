const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');

router.post('/user/:id', userProfileController.getUserDetails);
router.post('/update/:id', userProfileController.UpdateUserDetails);

module.exports = router;  