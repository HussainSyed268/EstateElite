const Property = require('../models/Property');
const PropertyImages = require('../models/PropertyImage');
const { Op } = require('sequelize');

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


// find a property with different filters
exports.findProperty = async (req, res) => {
    try {
        const {
            city,
            country,
            type,
            minPrice,
            maxPrice,
            minArea,
            maxArea,
            minBedrooms,
            maxBedrooms,
            minBathrooms,
            maxBathrooms,
            minParkingSpace,
            maxParkingSpace
        } = req.body;

        const properties = await Property.findAll({
            where: {
                city,
                country,
                type,
                price: { [Op.between]: [minPrice, maxPrice] },
                area: { [Op.between]: [minArea, maxArea] },
                bedrooms: { [Op.between]: [minBedrooms, maxBedrooms] },
                bathrooms: { [Op.between]: [minBathrooms, maxBathrooms] },
                parking_space: { [Op.between]: [minParkingSpace, maxParkingSpace] }
            }
        });

        res.status(200).json({ properties });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to find properties' });
    }
};


// Find a property by ID and get its images
exports.getPropertyById = async (req, res) => {
    try {
        const propertyId = req.params.id;

        const property = await Property.findOne({
            where: { id: propertyId }
        });

        const images = await PropertyImages.findAll({
            where: { property_id: propertyId }
        });

        res.json({ property,images});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to find property and images' });
    }
};

// find a property with different filters
exports.findProperty = async (req, res) => {
    try {
        const { 
            city, 
            type,
            area_type,
            max_area, 
            storeys,
            start_price,
            end_price,
            listing_reason
        } = req.body;

        // Create a dynamic where clause
        const whereClause = {
            status: "approved",
        };

        if (city) {
            whereClause.city = city;
        }

        if (type) {
            whereClause.type = type;
        }

        if (area_type && max_area) {
            whereClause.area_unit = area_type;
            whereClause.area = { [Op.lte]: max_area };
        }

        if (storeys) {
            whereClause.storeys = storeys;
        }

        if (start_price && end_price) {
            whereClause.price = { [Op.between]: [start_price, end_price] };
        }

        if (listing_reason) {
            whereClause.listing_reason = listing_reason;
        }

        console.log(whereClause);
        const properties = await Property.findAll({
            where: whereClause,
            attributes: ['id'] 
        });

        res.status(200).json({ properties });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to find properties' });
    }
};

// Fetch the only required details for the property that we need after filter

exports.fetchPropertyDetails = async (req, res) => {
    try {
        const propertyId = req.params.id;

        const property = await Property.findOne({
            where: { id: propertyId },
            attributes: ['id', 'name', 'price', 'description', 'type', 'rating']

        });

        const images = await PropertyImages.findAll({
            where: { property_id: propertyId, is360: 0},
            attributes: ['image'],
            limit: 1
        });


        res.status(200).json({ property, images });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch property details' });
    }
}


// Get all approved properties for cards
exports.getAllApprovedProperties = async (req, res) => {
    try {
        const properties = await Property.findAll({
            where: { status: 'approved' },
            attributes: ['id', 'name', 'price', 'description', 'type', 'rating'],
            include: [{
                model: PropertyImages,
                attributes: ['image'],
                where: { is360: 0 },
                required: false,  // Include properties even if they don't have images
                limit: 1
            }]
        });

        res.status(200).json({ properties });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
};