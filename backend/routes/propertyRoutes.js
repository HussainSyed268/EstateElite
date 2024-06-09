const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Route to add a new property
router.post('/add', propertyController.addProperty);

// Route to edit an existing property
router.put('/edit/:id', propertyController.editProperty);

// Route to remove a property
router.delete('/remove/:id', propertyController.removeProperty);


//Filter 
router.post('/filter', propertyController.findProperty);

// Route to get a property by ID
router.get('/:id', propertyController.getPropertyById);

//Route to fetch property info for property card
router.get('/info/:id', propertyController.fetchPropertyDetails);


// Route to get all approved properties for cards

router.post('/all', propertyController.getAllApprovedProperties);


// Route to rate a property
router.post('/rate', propertyController.rateProperty);

// Route to get property rating 
router.get('/rating/:id', propertyController.getRating);

router.post('/images/:id', propertyController.getPropertyImages)



module.exports = router;
