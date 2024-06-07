import React, { createContext, useState } from 'react';
import axios from 'axios';

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
    const getAllUsersCount = async () => {
        try {
            const response = await axios.post('/api/admin/count');
            return response.data;
        } catch (error) {
            console.error('Failed to get users count:', error);
        }
    };

    const getAllPropertiesCount = async () =>{
        try {
            const response = await axios.post('/api/admin/propertycount');
            return response.data;
        } catch (error) {
            console.error('Failed to get properties count:', error);
        }
    }

    const getPendingProperties = async () => {
        try {
            const response = await axios.get('/api/admin/pending');
            return response.data;
        } catch (error) {
            console.error('Failed to get pending properties:', error);
        }
    }

    const rejectProperty = async (id) => {
        try {
            const response = await axios.post(`/api/admin/reject/${id}`);
            return response.data;
        } catch (error) {
            console.error('Failed to reject property:', error);
        }
    }

    const approveProperty = async (id) => {
        try {
            const response = await axios.post(`/api/admin/approve/${id}`);
            return response.data;
        } catch (error) {
            console.error('Failed to approve property:', error);
        }
    }

    const getApprovedProperties = async () => {
        try {
            const response = await axios.get('/api/admin/approveproperty');
            return response.data;
        } catch (error) {
            console.error('Failed to get approved properties:', error);
        }
    }

    const getAllUsers = async () => {
        try {
            const response = await axios.get('/api/admin/users');
            return response.data;
        } catch (error) {
            console.error('Failed to get users:', error);
        }
    }

    const revokeUser = async (id) => {
        try{
            const response = await axios.post(`/api/admin/revoke/${id}`);
            return response.data;
        } catch(error){
            console.error('Failed to revoke user:', error);
        }
    }

    return (
        <AdminContext.Provider value={{ 
            getAllUsersCount, 
            getAllPropertiesCount,
            getPendingProperties,
            rejectProperty,
            approveProperty,
            getApprovedProperties,
            getAllUsers,
            revokeUser
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export { AdminContext, AdminProvider };
