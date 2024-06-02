const {sequelize} = require('./config/database');
const User = require('./models/User');
const UserProfile = require('./models/UserProfile');
const Property = require('./models/Property');
const SavedProperty = require('./models/SavedProperty');
const Inquiry = require('./models/Inquiry');
const Transaction = require('./models/Transaction');

sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
}).catch(error => {
    console.error('Error creating database:', error);
});
