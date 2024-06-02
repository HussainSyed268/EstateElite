import React, { useState } from "react";
import Home from '../assets/icons/home.png';
import User from '../assets/icons/user.png';
import Settings from '../assets/icons/settings.png';
import Approval from '../assets/icons/approval.png';

export default function Sidebar({ setSelectedTab }) {
    const [selected, setSelected] = useState('Dashboard'); // State to track selected tab

    // Function to handle tab selection
    const handleTabSelect = (tabName) => {
        setSelected(tabName);
        setSelectedTab(tabName); // Lift the state up to AdminPanel
    }

    return (
        <div className={`sidebar bg-black  h-full font-roboto shadow-lg transition-all duration-300 md:w-64  lg:w-1/4 `}>
            <div className={`sidebar-title text-white text-center text-3xl font-semibold px-5 py-6 border-b border-gray-700 transition-all duration-300 `}>
                <h2>HomeTour</h2>
                <p className="text-sm font-medium text-[#F9A826]">The way to your home</p>
            </div>
            <div className="sidebar-menu">
                <ul className="space-y-2 px-5 py-4 text-lg font-semibold">
                    <li className={`flex items-center py-2 hover:bg-xinc-800 rounded-md transition duration-200 text-inherit ${selected === 'Dashboard' ? 'bg-zinc-800' : ''}`}>
                        <img className="w-6 h-6 mr-4" src={User} alt="Users" />
                        <a href="#" className={`text-white block py-3 hover:text-[#F9A826] transition-opacity duration-300`} onClick={() => handleTabSelect('Dashboard')}>Dashboard</a>
                    </li>
                    <li className={`flex items-center py-2 hover:bg-gray-800 rounded-md transition duration-200 text-inherit ${selected === 'Manage Properties' ? 'bg-gray-800' : ''}`}>
                        <img className="w-6 h-6 mr-4" src={Home} alt="Home" />
                        <a href="#" className={`text-white hover:text-[#F9A826] block py-3 transition-opacity duration-300`} onClick={() => handleTabSelect('Manage Properties')}>Manage Properties</a>
                    </li>
                    <li className={`flex items-center py-2 hover:bg-gray-800 rounded-md transition duration-200 text-inherit ${selected === 'Approval' ? 'bg-gray-800' : ''}`}>
                        <img className="w-6 h-6 mr-4" src={Approval} alt="Orders" />
                        <a href="#" className={`text-white block py-3 hover:text-[#F9A826] transition-opacity duration-300`} onClick={() => handleTabSelect('Approval')}>Property Approvals</a>
                    </li>
                    <li className={`flex items-center py-2 hover:bg-gray-800 rounded-md transition duration-200 text-inherit ${selected === 'Manage Profile' ? 'bg-gray-800' : ''}`}>
                        <img className="w-6 h-6 mr-4" src={Settings} alt="Products" />
                        <a href="#" className={`text-white hover:text-[#F9A826] block py-3 transition-opacity duration-300`} onClick={() => handleTabSelect('Manage Profile')}>Manage Your Profile</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
