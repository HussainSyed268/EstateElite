const express = require('express');
const router = express.Router();
const { saveProperty, unsaveProperty, getSavedProperties, checkSavedProperty } = require('../controllers/savedPropertyController');

// Save a property
router.post('/save', saveProperty);

// Unsave a property
router.post('/unsave', unsaveProperty);

// Get all saved properties for a user
router.get('/saved/:userId', getSavedProperties);

// Check if a property is saved
router.post('/check', checkSavedProperty);

module.exports = router;
