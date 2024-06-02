import React, { useState } from "react";
import Home from '../assets/icons/home.png';
import User from '../assets/icons/user.png';
import Settings from '../assets/icons/settings.png';
import Approval from '../assets/icons/approval.png';

export default function Sidebar() {
    

    return (
        <div
            className={`sidebar bg-black h-[100vh] font-roboto shadow-lg transition-all duration-300 md:w-64  lg:w-1/4 `}
            
        >
            <div className={`sidebar-title text-white text-center text-3xl font-semibold px-5 py-6 border-b border-gray-700 transition-all duration-300 `}>
                <h2>HomeTour</h2>
                <p className="text-sm font-medium text-[#F9A826]">The way to your home</p>
            </div>
            <div className="sidebar-menu">
                <ul className="space-y-2 px-5 py-4 text-lg font-semibold">
                    <li className="flex items-center hover:bg-gray-800 rounded-md transition duration-200 text-inherit">
                        <img className="w-6 h-6 mr-4" src={User} alt="Users" />
                        <a href="#" className={`text-white block py-3 hover:text-[#F9A826] transition-opacity duration-300 `}>Dashboard</a>
                    </li>
                    <li className="flex items-center hover:bg-gray-800 rounded-md transition duration-200 text-inherit">
                        <img className="w-6 h-6 mr-4" src={Home} alt="Home" />
                        <a href="#" className={`text-white hover:text-[#F9A826] block py-3 transition-opacity duration-300 `}>My Properties</a>
                    </li>
                    <li className="flex items-center hover:bg-gray-800 rounded-md transition duration-200 text-inherit">
                        <img className="w-6 h-6 mr-4" src={Approval} alt="Orders" />
                        <a href="#" className={`text-white block py-3 hover:text-[#F9A826] transition-opacity duration-300 `}>Property Approvals</a>
                    </li>
                    <li className="flex items-center hover:bg-gray-800 rounded-md transition duration-200 text-inherit">
                        <img className="w-6 h-6 mr-4" src={Settings} alt="Products" />
                        <a href="#" className={`text-white hover:text-[#F9A826] block py-3 transition-opacity duration-300`}>Manage Your Profile</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
