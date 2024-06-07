const Property = require('../models/Property');
const PropertyImages = require('../models/PropertyImage');

// Add a new property
exports.addProperty = async (req, res) => {
    try {
        const {
            seller_id,
            name,
            description,
            price,
            address,
            city,
            country,
            storeys,
            bedrooms,
            bathrooms,
            parking_space,
            area,
            area_unit,
            status="pending",
            listing_reason,
            type,
            rating=0, 
            images // Array of images
        } = req.body;

        console.log(req.body);

        // Create the property
        const property = await Property.create({
            seller_id,
            name,
            description,
            price,
            address,
            city,
            country,
            storeys,
            bedrooms,
            bathrooms,
            parking_space,
            area,
            area_unit,
            status,
            listing_reason,
            type,
            rating
        });

        // Create property images
        if (images && images.length > 0) {
            await Promise.all(images.map(async (image) => {
                await PropertyImages.create({
                    property_id: property.id,
                    image: image.image,
                    is360: image.is360,
                });
            }));
        }

        res.status(201).json({ message: 'Property added successfully', property });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add property' });
    }
};

// Edit an existing property
exports.editProperty = async (req, res) => {
    try {
        const propertyId = req.params.id;
        const {
            name,
            description,
            price,
            address,
            city,
            country,
            storeys,
            bedrooms,
            bathrooms,
            parking_space,
            area,
            area_unit,
            status,
            listing_reason,
            type,
            rating,
            images // Array of images
        } = req.body;

        // Update the property
        await Property.update({
            name,
            description,
            price,
            address,
            city,
            country,
            storeys,
            bedrooms,
            bathrooms,
            parking_space,
            area,
            area_unit,
            status,
            listing_reason,
            type,
            rating
        }, {
            where: { id: propertyId }
        });

        // Update property images
        if (images && images.length > 0) {
            await PropertyImages.destroy({ where: { property_id: propertyId } });
            await Promise.all(images.map(async (image) => {
                await PropertyImages.create({
                    property_id: propertyId,
                    image: image.image,
                    is360: image.is360
                });
            }));
        }

        res.status(200).json({ message: 'Property updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update property' });
    }
};

// Remove a property
exports.removeProperty = async (req, res) => {
    try {
        const propertyId = req.params.id;

        // Remove property images
        await PropertyImages.destroy({ where: { property_id: propertyId } });

        // Remove the property
        await Property.destroy({ where: { id: propertyId } });

        res.status(200).json({ message: 'Property removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to remove property' });
    }
};
