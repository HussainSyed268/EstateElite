import React, { useState } from "react";
import Home from '../assets/icons/home.png';
import User from '../assets/icons/user.png';
import Approval from '../assets/icons/approval.png';
import Settings from '../assets/icons/settings.png';
import Menu from '../assets/icons/menu.png';
import Logo from '../assets/logo/logo-black-yellow.png';

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <div
                className={`fixed top-0 left-0 h-full bg-black font-roboto shadow-lg transition-all duration-300 z-50 ${isExpanded ? 'w-3/4 md:w-1/4' : 'w-16'}`}
            >
                <div className="sidebar-header flex justify-between items-center border-b border-gray-700 px-5 py-4">
                    <button onClick={toggleSidebar} className={`menu-icon w-8 h-8 transition-all duration-300 ${isExpanded ? 'rotate-90' : ''}`}>
                        <img src={Menu} alt="Menu" className="w-6 h-6 z-10" />
                    </button>
                    <div className={`sidebar-title mx-auto text-white text-3xl font-semibold transition-all duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
                        <img className="w-32 h-32" src={Logo} alt="BricksReal" />
                    </div>
                </div>
                <div className="sidebar-menu pl-5">
                    <ul className={`space-y-8 px-5 py-4 text-sm my-6 font-semibold ${isExpanded ? 'block' : 'hidden'}`}>
                        <li className="flex items-center w-full mx-auto hover:bg-gray-800 rounded-md transition duration-200 text-inherit">
                            <img className={`w-6 h-6 mr-4 my-2 ${isExpanded ? 'opacity-100' : 'opacity-0'}`} src={Home} alt="Home" />
                            <a href="/admin" className={`text-white hover:text-[#F9A826] block py-3 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>Dashboard</a>
                        </li>
                        <li className="flex items-center hover:bg-gray-800 rounded-md transition duration-200 text-inherit">
                            <img className={`w-6 h-6 mr-4 my-2 ${isExpanded ? 'opacity-100' : 'opacity-0'}`} src={User} alt="Users" />
                            <a href="/admin/properties" className={`text-white hover:text-[#F9A826] block py-3 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>Manage Properties</a>
                        </li>
                        <li className="flex items-center hover:bg-gray-800 rounded-md transition duration-200 text-inherit">
                            <img className={`w-6 h-6 mr-4 my-2 ${isExpanded ? 'opacity-100' : 'opacity-0'}`} src={User} alt="Users" />
                            <a href="/admin/users" className={`text-white hover:text-[#F9A826] block py-3 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>Manage User</a>
                        </li>
                        <li className="flex items-center hover:bg-gray-800 rounded-md transition duration-200 text-inherit">
                            <img className={`w-6 h-6 mr-4 ${isExpanded ? 'opacity-100' : 'opacity-0'}`} src={Approval} alt="Products" />
                            <a href="/admin/approval" className={`text-white hover:text-[#F9A826] block py-3 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>Approve Pending Properties</a>
                        </li>
                        <li className="flex items-center hover:bg-gray-800 rounded-md transition duration-200 text-inherit">
                            <img className={`w-6 h-6 mr-4 ${isExpanded ? 'opacity-100' : 'opacity-0'}`} src={Settings} alt="Orders" />
                            <a href="/admin/account" className={`text-white hover:text-[#F9A826] block py-3 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>Manage Account</a>
                        </li>
                    </ul>
                </div>
            </div>
            {isExpanded && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black opacity-50 z-40"
                ></div>
            )}
        </>
    );
}
