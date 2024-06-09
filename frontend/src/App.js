import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';
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
import Dashboard from "./components/Dashboard";
import AdminLayout from "./layout/AdminLayout";
import Approval from "./components/Approval";
import UpdateProfile from "./components/UpdateProfile";
import ManageUserPage from "./pages/ManageUserPage";
import ContactUs from "./pages/ContactUs";
import { ThemeProvider } from "@mui/system";
import theme from "./theme";

import SavedProperties from './components/SavedProperties';
import ListedProperties from './components/ListedProperties';

import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <AuthProvider>
        <AdminProvider>
            <ThemeProvider theme={theme}>
                <Router>
                    <Main />
                    <ToastContainer />
                </Router>
            </ThemeProvider>
        </AdminProvider>
        </AuthProvider>
    );
}

function Main() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const noFooterRoutes = ['/login', '/signup'];

    const shouldHideFooter = noFooterRoutes.includes(location.pathname);

    return (
        <>
            {!isAdminRoute && <Navbar />}
            <div className=''>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/find" element={<Find />} />
                    <Route path="/property/:propertyId" element={<Property />} />
                    <Route path="/add-property" element={<AddProperty />} />
                    <Route path="/savedproperties" element={<SavedProperties />} />
                    <Route path="/listedproperties" element={<ListedProperties />} />
                    <Route path="/updateprofile" element={<UpdateProfile />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    {/* <Route path="/logout" element={<Logout />} /> Create a Logout component or handle logout logic */}
                    
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="properties" element={<ManagePropertyPage />} />
                        <Route path="users" element={<ManageUserPage />} />
                        <Route path="account" element={<UpdateProfile />} />
                        <Route path="approval" element={<Approval />} />
                    </Route>
                </Routes>
            </div>
            {!isAdminRoute && !shouldHideFooter && <Footer />}
        </>
    );
}

export default App;
