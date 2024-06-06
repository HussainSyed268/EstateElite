const User = require('../models/User');
const Property = require('../models/Property');
const PropertyImage = require('../models/PropertyImage');

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