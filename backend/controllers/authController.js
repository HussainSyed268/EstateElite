const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserProfile = require('../models/UserProfile');

const secretKey = process.env.JWT_SECRET_KEY;

exports.register = async (req, res) => {
    try {
        const { username, password, email, firstName, lastName, contactNumber,profilePicture } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user with the provided details
        const newUser = await User.create({ username, password_hash: hashedPassword, email, role: 'customer' });
        
        // Create a new user profile with the additional details
        await UserProfile.create({ user_id: newUser.id, first_name: firstName, last_name: lastName, contact_number: contactNumber, profile_picture: profilePicture});
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (user && await bcrypt.compare(password, user.password_hash)) {
            const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
            
            // Fetch user profile
            const userProfile = await UserProfile.findOne({ where: { user_id: user.id } });

            // Combine user and profile information
            const userWithProfile = {
                ...user.toJSON(),
                profile: userProfile ? userProfile.toJSON() : null
            };

            res.json({ token, user: userWithProfile });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Login failed:', error);
        res.status(500).json({ error: 'Failed to log in' });
    }
};

exports.requestPasswordReset = async (req, res) => {
    // Implement password reset request logic
};

exports.resetPassword = async (req, res) => {
    // Implement password reset confirmation logic
};
