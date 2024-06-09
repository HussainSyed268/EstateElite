import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
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
import About from './pages/About';

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
    const { auth } = useContext(AuthContext);
    const isAdminRoute = location.pathname.startsWith('/admin');
    const noFooterRoutes = ['/login', 
        '/signup',
        '/admin',
        '/admin/properties',
        '/admin/users',
        '/admin/account',
        '/admin/approval',
    ]; // Added '/admin' to noFooterRoutes
    const shouldHideFooter = noFooterRoutes.some(route => location.pathname.startsWith(route)); // Changed to .some()

    return (
        <>
            {!isAdminRoute && <Navbar />} {/* Render Navbar only if not on admin route */}
            <div className=''>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/find" element={<Find />} />
                    <Route path="/property/:propertyId" element={<Property />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/add-property" element={<AddProperty />} />

                    {auth.user && auth.user.role === 'customer' && (
                        <>
                            <Route path="/savedproperties" element={<SavedProperties />} />
                            <Route path="/listedproperties" element={<ListedProperties />} />
                            <Route path="/updateprofile" element={<UpdateProfile />} />
                            {/* if any other route than redirect back to home */}
                            <Route path="*" element={<Home />} />
                        </>
                    )}

                    {auth.user && auth.user.role === 'admin' && (
                        <>
                            <Route path="/property/:propertyId" element={<Property />} />
                            <Route path="/admin/*" element={<AdminLayout />}>
                                <Route index element={<Dashboard />} />
                                <Route path="properties" element={<ManagePropertyPage />} />
                                <Route path="users" element={<ManageUserPage />} />
                                <Route path="account" element={<UpdateProfile />} />
                                <Route path="approval" element={<Approval />} />
                                {/* if any other route even outside admin than redirect back to admin */}
                                <Route path="*" element={<Dashboard />} />
                            </Route>
                        </>
                    )}
                </Routes>
            </div>
            {!shouldHideFooter  && <Footer />} {/* Hide footer if on routes specified in noFooterRoutes */}
        </>
    );
}


export default App;
