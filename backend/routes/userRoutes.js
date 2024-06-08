const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');

router.post('/user/:id', userProfileController.getUserDetails);
router.post('/update/:id', userProfileController.UpdateUserDetails);
router.get('/properties/:id', userProfileController.getUserProperties);
router.get('/delete/:id', userProfileController.deleteUserProperty);

module.exports = router;  