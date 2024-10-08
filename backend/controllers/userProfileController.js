const bcrypt = require('bcrypt');
const User = require('../models/User');
const UserProfile = require('../models/UserProfile');
const Property = require('../models/Property');
const PropertyImages = require('../models/PropertyImage');


exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        
        // Find user by id
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find user profile based on user_id
        const userProfile = await UserProfile.findOne({ where: { user_id: userId } });

        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }

        // Return both user and user profile
        res.status(200).json({ user, userProfile });
    } catch (error) {
        console.error('Failed to get user details:', error);
        res.status(500).json({ message: 'Failed to get user details' });
    }
};

exports.UpdateUserDetails = async (req, res) => {
    // The user can update anything from these: [email, contact, password(will get a confirm password), first name, last name]. The password must be hashed and changed in the database.
    try{
        const userId = req.params.id;
        console.log(req.body);
        const { email, contact, password, first_name, last_name, current_password } = req.body;
        const user = await User.findByPk(userId);
        // console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userProfile = await UserProfile.findOne({ where: { user_id: userId } });
        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }
        if(email){
            user.email = email;
        }
        if(contact){
            userProfile.contact_number = contact;
        }
        if(password && current_password){

            const isPasswordValid = await bcrypt.compare(current_password, user.password_hash);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid password' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password_hash = hashedPassword;
        }
        if(first_name){
            userProfile.first_name = first_name;
        }
        if(last_name){
            userProfile.last_name = last_name;
        }
        await user.save();
        await userProfile.save();
        res.status(200).json({ message: 'User details updated successfully' });
    }
    catch(error){
        console.error('Failed to update user details:', error);
        res.status(500).json({ message: 'Failed to update user details' });
    }
}

exports.getUserProperties = async (req, res) => {
    try {
        const userId = req.params.id;
        const properties = await Property.findAll({ 
            where: { seller_id: userId, status: "approved" } 
        });
        res.status(200).json({ properties });
    } catch (error) {
        console.error('Failed to get user properties:', error);
        res.status(500).json({ message: 'Failed to get user properties' });
    }
}

//Delete a whole property with all its images

exports.deleteUserProperty = async (req, res) => {
    try {
        const propertyId = req.params.id;
        const property = await Property.findByPk(propertyId);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        await PropertyImages.destroy({ where: { property_id: propertyId } });
        await property.destroy();
        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error('Failed to delete property:', error);
        res.status(500).json({ message: 'Failed to delete property' });
    }
}