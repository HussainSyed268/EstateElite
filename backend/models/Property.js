const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Property = sequelize.define('Property', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    seller_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    storeys: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    parking_space: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    area: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    area_unit: {
        type: DataTypes.ENUM('marla', 'canal'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        allowNull: false
    },
    listing_reason: {
        type: DataTypes.ENUM('rent', 'sale'),
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('apartment', 'house', 'condo', 'land', 'commercial'),
        allowNull: false
    },
    rating: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
        defaultValue: 0.0,
        validate: {
            min: 0.0,
            max: 5.0
        }
    },
    // Number of people who have rated the property
    rating_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'properties'
});

Property.belongsTo(User, { foreignKey: 'seller_id' });

module.exports = Property;
