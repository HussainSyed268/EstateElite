const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/users', adminController.getAllUsers);
router.post('/count', adminController.getAllUsersCount);
router.post('/propertycount', adminController.getAllPropertiesCount);
router.get('/pending', adminController.getPendingProperties);
router.post('/reject/:id', adminController.RejectProperty);
router.post('/approve/:id', adminController.ApproveProperty);
router.get('/approveproperty', adminController.getApprovedProperties);

module.exports = router;  