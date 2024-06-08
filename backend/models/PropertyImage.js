const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Property = require('./Property');

const PropertyImages = sequelize.define('PropertyImages', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    property_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Property,
            key: 'id'
        },
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    is360:{
        type: DataTypes.BOOLEAN,
        allowNull: false
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
    tableName: 'property_images'
});

PropertyImages.belongsTo(Property, { foreignKey: 'property_id' });

module.exports = PropertyImages;
