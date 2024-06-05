import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Signup';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Property from './pages/Property';
import AddProperty from './pages/AddProperty';
import Find from './pages/Find';
import ManagePropertyPage from "./pages/ManagePropertyPage";
import Dashboard from "./components/Dashboard"
import AdminLayout from "./layout/AdminLayout";
import Approval from "./components/Approval";
import UpdateProfile from "./components/UpdateProfile";
import ManageUserPage from "./pages/ManageUserPage"
import { ThemeProvider } from "@mui/system";
import theme from "./theme";

import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <Router>
                    <Main />
                    <ToastContainer />
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
}

function Main() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <>
            {!isAdminRoute && <Navbar />}
            <div className='min-h-[100vh]'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/find" element={<Find />} />
                    <Route path="/property" element={<Property />} />
                    <Route path="/add-property" element={<AddProperty />} />
                    
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="properties" element={<ManagePropertyPage />} />
                        <Route path="users" element={<ManageUserPage />} />
                        <Route path="account" element={<UpdateProfile />} />
                        <Route path="approval" element={<Approval />} />
                    </Route>
                </Routes>
            </div>
            {!isAdminRoute && <Footer />}
        </>
    );
}

export default App;
