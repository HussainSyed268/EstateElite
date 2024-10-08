import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Logo from '../assets/logo3.png';
import {toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

    
    const generateError = (err) => {
        toast.error(err, {
            position: "bottom-right",
        });
    }
    const generateSuccess = (msg) => {
        toast.success(msg, {
            position: "bottom-right",
        });
    }

    const { login, auth } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            generateError("Please fill in all fields");
            return;
        }
        try {
            await login(username, password);
            if (localStorage.getItem('token')) {
                generateSuccess("Logged in successfully");
                setTimeout(() => {
                    // Redirect based on user role
                    const user = JSON.parse(localStorage.getItem('user'));
                    if (user.role === 'admin') {
                        window.location = '/admin';
                    } else {
                        window.location = '/';
                    }
                }, 1500);
            }
        } catch (error) {
            generateError("Invalid username or password");
        }
    };

    useEffect(() => {
        if (auth.user){
            if (auth.user.role === 'admin'){
                window.location = '/admin';
            } else {
                window.location = '/';
            }
        }
    }
    , [auth.user]);

    return (
        <section className="bg-white">
            <div className="container flex items-center justify-center h-[35rem] px-6 mx-auto">
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="flex justify-center mx-auto">
                        <img className="w-[2rem]" src={Logo} alt="logo" />
                    </div>
                    
                    <div className="flex items-center justify-center mt-6">
                        <Link to="/login" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-[#F9A826]">
                            sign in
                        </Link>

                        <Link to="/signup" className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b">
                            sign up
                        </Link>
                    </div>

                    <div className="relative flex items-center mt-8">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-[#F9A826] focus:ring-[#f0c073] focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Username"
                        />
                    </div>

                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-[#F9A826] focus:ring-[#f0c073] focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Password"
                        />
                    </div>

                    <div className="mt-6">
                        <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#F9A826] rounded-lg hover:bg-[#e4a94a] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Sign in
                        </button>

                        <div className="mt-6 text-center">
                            <Link to="/signup" className="text-sm text-[#F9A826] hover:underline">
                                Don't have an account yet? Sign up
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            
        </section>
    );
}

export default Login;
