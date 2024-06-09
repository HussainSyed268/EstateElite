const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const userRoutes = require('./userRoutes');
const propertyRoutes = require('./propertyRoutes');
const saveRoutes = require('./saveRoutes');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/users', userRoutes);
router.use('/property', propertyRoutes);
router.use('/save', saveRoutes);


module.exports = router;
