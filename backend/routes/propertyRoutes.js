const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Route to add a new property
router.post('/add', propertyController.addProperty);

// Route to edit an existing property
router.put('/edit/:id', propertyController.editProperty);

// Route to remove a property
router.delete('/remove/:id', propertyController.removeProperty);

// Route to get a property by ID
router.get('/:id', propertyController.getPropertyById);


module.exports = router;
