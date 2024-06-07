const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const userRoutes = require('./userroutes');


router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/users', userRoutes);


module.exports = router;
