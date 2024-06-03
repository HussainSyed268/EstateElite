const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');
const User = require('./User');
const Property = require('./Property');

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    buyer_id: {
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
    transaction_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'transactions'
});

Transaction.belongsTo(User, { foreignKey: 'buyer_id' });
Transaction.belongsTo(Property, { foreignKey: 'property_id' });

module.exports = Transaction;
