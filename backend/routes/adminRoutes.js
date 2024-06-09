const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/count', adminController.getAllUsersCount);
router.post('/propertycount', adminController.getAllPropertiesCount);
router.get('/pending', adminController.getPendingProperties);
router.post('/reject/:id', adminController.RejectProperty);
router.post('/approve/:id', adminController.ApproveProperty);
router.get('/approveproperty', adminController.getApprovedProperties);
router.post('/users', adminController.getAllUsers);
router.post('/details/:id', adminController.getUserDetails);
router.post('/revoke/:id', adminController.revokeUser);

module.exports = router;  