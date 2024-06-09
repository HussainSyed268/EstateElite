const User = require('../models/User');
const Property = require('../models/Property');
const PropertyImage = require('../models/PropertyImage');
const UserProfile = require('../models/UserProfile');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Failed to get users:', error);
        res.status(500).json({ error: 'Failed to get users' });
    }
}

exports.getAllUsersCount = async (req, res) => {
    try {
        const usersCount = await User.count();
        res.json(usersCount);
    } catch (error) {
        console.error('Failed to get users count:', error);
        res.status(500).json({ error: 'Failed to get users count' });
    }
}

exports.getAllPropertiesCount = async(req, res) => {
    try{
        const propertyCount = await Property.count({
            where: {
                status: ['approved', 'pending']
            }
        });
        res.json(propertyCount);
    } catch (error){
        console.error('Failed to get properties count:', error);
        res.status(500).json({ error: 'Failed to get properties count' });
    }
}


// Pending Properties Section

exports.getPendingProperties = async (req, res) => {
    try {
        const pendingProperties = await Property.findAll({
            where: {
                status: 'pending'
            },
            include: [{
                model: User,
                attributes: ['username'] 
            }]
        });
        res.json(pendingProperties);
    } catch(error) {
        console.error('Failed to get pending properties:', error);
        res.status(500).json({ error: 'Failed to get pending properties' });
    }
}


exports.RejectProperty = async (req, res) => {
    try {
        const { id } = req.params;
        // Change the status to rejected
        await Property.update({ status: 'rejected' }, { where: { id } });
        // Remove the property images
        
        
        res.json({ message: 'Property rejected successfully' });
    } catch (error) {
        console.error('Failed to remove property:', error);
        res.status(500).json({ error: 'Failed to remove property' });
    }
}

exports.ApproveProperty = async (req, res) => {
    try {
        const { id } = req.params;
        // Change the status to approved
        await Property.update({ status: 'approved' }, { where: { id } });
        res.json({ message: 'Property approved successfully' });
    } catch (error) {
        console.error('Failed to approve property:', error);
        res.status(500).json({ error: 'Failed to approve property' });
    }
}


// Manage Approved Properties Section

exports.getApprovedProperties = async (req, res) => {
    try{
        const approvedProperties = await Property.findAll({
            where: {
                status: 'approved'
            },
            include: [{
                model: User,
                attributes: ['username']
            }]
        });
        res.json(approvedProperties);
    } catch(error){
        console.error('Failed to get approved properties:', error);
        res.status(500).json({ error: 'Failed to get approved properties' });
    }
}

// Manage Users Section

exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.findAll();
        res.json(users);
    } catch(error){
        console.error('Failed to get users:', error);
        res.status(500).json({ error: 'Failed to get users' });
    }
}

exports.getUserDetails = async (req, res) => {
    try{
        const { id } = req.params;
        const userProfile = await UserProfile.findOne({ where: { user_id: id } });
        res.json({  userProfile });
    } catch(error){
        console.error('Failed to get user details:', error);
        res.status(500).json({ error: 'Failed to get user details' });
    }
}

exports.revokeUser = async (req, res) => {
    try{
        //Revoke User and delete his all properties and his user profile (if any)
        const { id } = req.params;
        await User.destroy({ where: { id } });
        await Property.destroy({ where: { seller_id: id } });
        await UserProfile.destroy({ where: { user_id: id } });
        res.json({ message: 'User revoked successfully' }); 
    } catch(error){
        console.error('Failed to revoke user:', error);
        res.status(500).json({ error: 'Failed to revoke user' });
    }
}