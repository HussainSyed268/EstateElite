const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');
const User = require('./User');
const Property = require('./Property');

const Inquiry = sequelize.define('Inquiry', {
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
    inquiry: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    reply: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'inquiries'
});

Inquiry.belongsTo(User, { foreignKey: 'user_id' });
Inquiry.belongsTo(Property, { foreignKey: 'property_id' });

module.exports = Inquiry;
