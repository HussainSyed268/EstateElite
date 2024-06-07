const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const propertyRoutes = require('./propertyRoutes');


router.use('/auth', authRoutes);
router.use('/property', propertyRoutes);


module.exports = router;
