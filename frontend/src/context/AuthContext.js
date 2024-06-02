import React, { createContext, useState } from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token') || '',
        user: JSON.parse(localStorage.getItem('user')) || null
    });

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

    const register = async (username, email, password) => {
        try {
            await axios.post('/api/auth/register', { username, email, password });
            toast.success('User registered successfully', {
                position: "bottom-right",
            });
            //wait for 1.5 seconds
            setTimeout(() => {
                login(username, password);
                window.location = '/';
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

    return (
        <AuthContext.Provider value={{ auth, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
