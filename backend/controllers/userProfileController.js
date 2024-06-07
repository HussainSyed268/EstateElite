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