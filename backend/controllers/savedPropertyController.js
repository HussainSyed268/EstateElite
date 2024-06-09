const SavedProperty = require('../models/SavedProperty');
const Property = require('../models/Property');
const User = require('../models/User');

// Save a property
const saveProperty = async (req, res) => {
    const { userId, propertyId } = req.body;

    try {
        // Check if the property is already saved
        const existingSavedProperty = await SavedProperty.findOne({
            where: { user_id: userId, property_id: propertyId }
        });

        if (existingSavedProperty) {
            return res.status(400).json({ message: 'Property is already saved' });
        }

        // Save the property
        const savedProperty = await SavedProperty.create({
            user_id: userId,
            property_id: propertyId
        });

        return res.status(201).json(savedProperty);
    } catch (error) {
        console.error('Error saving property:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Unsave a property
const unsaveProperty = async (req, res) => {
    const { userId, propertyId } = req.body;

    try {
        // Check if the property is saved
        const existingSavedProperty = await SavedProperty.findOne({
            where: { user_id: userId, property_id: propertyId }
        });

        if (!existingSavedProperty) {
            return res.status(400).json({ message: 'Property is not saved' });
        }

        // Unsave the property
        await existingSavedProperty.destroy();

        return res.status(200).json({ message: 'Property unsaved successfully' });
    } catch (error) {
        console.error('Error unsaving property:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getSavedProperties = async (req, res) => {
    const { userId } = req.params; // Changed to params to match the route

    try {
        const savedProperties = await SavedProperty.findAll({
            where: { user_id: userId },
            include: {
                model: Property,
                attributes: ['id', 'name', 'description', 'price', 'type', 'rating']
            }
        });

        return res.status(200).json(savedProperties);
    } catch (error) {
        console.error('Error fetching saved properties:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

//Check if the property is already saved
const checkSavedProperty = async (req, res) => {
    const { userId, propertyId } = req.body;

    try {
        const existingSavedProperty = await SavedProperty.findOne({
            where: { user_id: userId, property_id: propertyId }
        });

        return res.status(200).json({ isSaved: existingSavedProperty ? true : false });
    } catch (error) {
        console.error('Error checking saved property:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    saveProperty,
    unsaveProperty,
    getSavedProperties,
    checkSavedProperty
};