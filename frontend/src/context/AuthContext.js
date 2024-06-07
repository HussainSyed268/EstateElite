import React, { createContext, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import defaultUser from '../assets/defaultUser.jpg';

import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token') || '',
        user: JSON.parse(localStorage.getItem('user')) || null
    });

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const fetchDefaultUserImage = async () => {
        const response = await fetch(defaultUser);
        const blob = await response.blob();
        const base64Image = await convertToBase64(blob);
        return base64Image;
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post('/api/auth/login', { username, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setAuth({ token, user });
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Invalid username or password', {
                position: "bottom-right",
            });
        }
    };

    const register = async (username, email, password, firstName, lastName, contactNumber) => {
        try {
            const profilePicture = await fetchDefaultUserImage();
            await axios.post('/api/auth/register', { username, email, password, firstName, lastName, contactNumber, profilePicture });
            toast.success('User registered successfully', {
                position: "bottom-right",
            });
            //wait for 1.5 seconds
            setTimeout(() => {
                window.location = '/login';
            }, 1500);
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error('Sign-up failed', {
                position: "bottom-right",
            });
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuth({ token: '', user: null });
    };

    const getUserDetails = async () => {
        try {
            const id = auth.user.id;
            const response = await axios.get('/api/users/user/' + id);
            const { user } = response.data;
            setAuth({ ...auth, user });
        } catch (error) {
            console.error('Failed to get user details:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ auth, login, register, logout, getUserDetails }}>
            {children}
            <ToastContainer />
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
