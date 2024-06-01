const { DataTypes } = require('sequelize');
const {sequelize}= require('../config/database');
const User = require('./User');
const Property = require('./Property');

const SavedProperty = sequelize.define('SavedProperty', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    property_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Property,
            key: 'id'
        },
        allowNull: false
    },
    saved_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'saved_properties'
});

SavedProperty.belongsTo(User, { foreignKey: 'user_id' });
SavedProperty.belongsTo(Property, { foreignKey: 'property_id' });

module.exports = SavedProperty;
