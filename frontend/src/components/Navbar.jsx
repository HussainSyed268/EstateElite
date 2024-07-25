import React, { useState, useContext } from "react";
import Logo from "../assets/logoFin.png";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { UserPopover } from './UserPopover';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { auth } = useContext(AuthContext);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const isPopoverOpen = Boolean(anchorEl);

    const { user, token } = auth;
    const isAuthenticated = Boolean(token);

    return (
        <nav className="relative flex justify-between items-center font-raleway z-10 bg-[#fafafa] text-[#242424] py-8 my-5 mx-4 rounded-xl">
            <div className="logo font-bold mx-10">
                <Link to="/">
                    <img src={Logo} alt="logo" className="w-[180px]" />
                </Link>
            </div>
            <div className="lg:hidden mx-10">
                <button onClick={() => setIsOpen(!isOpen)} className="text-[#242424] focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                    </svg>
                </button>
            </div>
            <div className="hidden lg:flex lg:items-center lg:space-x-5 mx-10 flex-grow justify-center">
                <ul className="flex flex-row space-x-5">
                    <li>
                        <Link to="/" className="text-[#242424] text-[1rem] font-semibold transition-all hover:text-white">Home</Link>
                    </li>
                    <li>
                        <Link to="/find" className="text-[#242424] hover:text-white text-[1rem] font-semibold transition-all">Find Property</Link>
                    </li>
                    <li>
                        <Link to="/add-property" className="text-[#242424] hover:text-white text-[1rem] font-semibold transition-all">List Property</Link>
                    </li>
                    <li>
                        <Link to="/about" className="text-[#242424] hover:text-white text-[1rem] font-semibold transition-all">About</Link>
                    </li>
                    <li>
                        <Link to="/contact-us" className="text-[#242424] text-[1rem] font-semibold transition-all hover:text-white">Contact Us</Link>
                    </li>
                </ul>
            </div>
            <div className="hidden lg:flex lg:items-center space-x-2 mx-10">
                {isAuthenticated ? (
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                        <Avatar
                            src={user.profile.profile_picture} // Use base64 profile picture
                            sx={{ cursor: 'pointer' }}
                            onClick={handleAvatarClick} // Attach click handler
                        />
                    </Stack>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="px-4 h-10 font-semibold rounded-xl hover:text-white hover:bg-black transition-all">Log In</button>
                        </Link>
                        <Link to="/signup">
                            <button className="px-4 h-10 font-semibold rounded-xl bg-[#F9A826] hover:text-white hover:bg-black transition-all">Sign Up</button>
                        </Link>
                    </>
                )}
            </div>
            {isOpen && (
                <div className="absolute top-28 w-[20rem] right-0 rounded-lg bg-[#fafafa] shadow-lg lg:hidden">
                    <ul className="flex flex-col space-y-4 py-4 px-8">
                        <li>
                            <Link to="/" className="text-[#242424] text-[1rem] font-semibold transition-all hover:text-[#F9A826]">Home</Link>
                        </li>
                        <li>
                            <Link to="/find" className="text-[#242424] hover:text-[#F9A826] text-[1rem] font-semibold transition-all">Find Property</Link>
                        </li>
                        <li>
                            <Link to="/add-property" className="text-[#242424] hover:text-[#F9A826] text-[1rem] font-semibold transition-all">List Property</Link>
                        </li>
                        <li>
                            <Link to="/about" className="text-[#242424] hover:text-[#F9A826] text-[1rem] font-semibold transition-all">About</Link>
                        </li>
                        <li>
                            <Link to="/contact-us" className="text-[#242424] text-[1rem] font-semibold transition-all hover:text-[#F9A826]">Contact Us</Link>
                        </li>
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-2">
                                <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                                    <Avatar
                                        src={user.profile.profile_picture} // Use base64 profile picture
                                        sx={{ cursor: 'pointer' }}
                                        onClick={handleAvatarClick} // Attach click handler
                                    />
                                </Stack>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link to="/login">
                                    <button className="px-4 h-10 font-semibold rounded-xl hover:text-white hover:bg-black transition-all">Log In</button>
                                </Link>
                                <Link to="/signup">
                                    <button className="px-4 h-10 font-semibold rounded-xl bg-[#F9A826] hover:text-white hover:bg-black transition-all">Sign Up</button>
                                </Link>
                            </div>
                        )}
                    </ul>
                </div>
            )}
            <UserPopover 
                anchorEl={anchorEl} 
                open={isPopoverOpen} 
                onClose={handlePopoverClose} 
            />
        </nav>
    );
}
