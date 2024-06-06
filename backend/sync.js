const {sequelize} = require('./config/database');
const User = require('./models/User');
const UserProfile = require('./models/UserProfile');
const Property = require('./models/Property');
const SavedProperty = require('./models/SavedProperty');
const PropertyImage = require('./models/PropertyImage');


sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
}).catch(error => {
    console.error('Error creating database:', error);
});
