import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Signup';
import Home from './pages/Home';
import {ToastContainer} from 'react-toastify';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Property from './pages/Property';
import AddProperty from './pages/AddProperty';
import Find from './pages/Find';

import 'react-toastify/dist/ReactToastify.css';


function App() {
    return (
        <AuthProvider>
            <Navbar />
            <div className='min-h-[100vh]'>
            <Router>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/signup" element={<Register/>} />
                        <Route path="/find" element={<Find/>} />
                        <Route path="/property" element={<Property/>} />
                        <Route path="/add-property" element={<AddProperty/>} />
                    </Routes>
            </Router>
            </div>
            <Footer />
            <ToastContainer />
        </AuthProvider>
    );
}

export default App;
