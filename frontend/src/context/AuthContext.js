import React, { createContext, useState } from 'react';
import axios from 'axios';

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
        }
    };

    const register = async (username, email, password) => {
        try {
            await axios.post('/api/auth/register', { username, email, password });
            login(username, password); // Automatically log in after registration
        } catch (error) {
            console.error('Registration failed:', error);
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
