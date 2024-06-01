import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Signup';

function App() {
    return (
        <AuthProvider>
            <Router>
                    <Routes>
                        <Route path="/login" element={<Login/>} />
                        <Route path="/signup" element={<Register/>} />

                    </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
