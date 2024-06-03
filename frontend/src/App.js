import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Signup';
import Home from './pages/Home';
import {ToastContainer} from 'react-toastify';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import 'react-toastify/dist/ReactToastify.css';


function App() {
    return (
        <AuthProvider>
            <Navbar />
            <Router>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/signup" element={<Register/>} />
                    </Routes>
            </Router>
            <Footer />
            <ToastContainer />
        </AuthProvider>
    );
}

export default App;
