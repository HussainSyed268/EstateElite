const bcrypt = require('bcrypt');
const User = require('../models/User');
const UserProfile = require('../models/UserProfile');


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
        const { email, contact, password, first_name, last_name } = req.body;
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
        if(password){
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