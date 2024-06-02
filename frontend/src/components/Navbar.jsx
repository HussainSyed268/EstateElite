import React, { useState } from "react";
import Logo from "../assets/logo.png";
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={`relative flex justify-between items-center font-roboto z-10 bg-[#fafafa] text-[#242424] py-4 my-5 mx-4 rounded-xl`}>
            <div className="logo font-bold mx-10">
                <a href="/">
                    <img src={Logo} alt="logo" className="w-[180px]" />
                </a>
            </div>
            <div className="flex lg:hidden mx-10">
                <button onClick={() => setIsOpen(!isOpen)} className="absolute m-4 top-0 right-0 text-[#242424] focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                    </svg>
                </button>
            </div>
            <div className={` w-[60%] flex justify-between ${!isOpen ? "flex-row":"flex-col" }  `}>
            <div className={`flex-col lg:flex-row lg:flex lg:items-center ${isOpen ? "flex" : "hidden"} lg:space-x-5 mx-10`}>
                <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-5 z-10">
                    <li>
                        <a href="#" className="text-[#242424] text-[1rem] font-semibold transition-all hover:text-[#F9A826]">Home</a>
                    </li>
                    <li>
                        <a href="#" className="text-[#242424] hover:text-[#F9A826] text-[1rem] font-semibold transition-all ">Find Property</a>
                    </li>
                    <li>
                        <a href="#" className="text-[#242424] hover:text-[#F9A826] text-[1rem] font-semibold transition-all ">About</a>
                    </li>
                    <li>
                        <a href="#" className="text-[#242424] text-[1rem] font-semibold transition-all hover:text-[#F9A826]">Contact Us</a>
                    </li>
                </ul>
                </div>
                <div className={` lg:flex-row lg:flex lg:items-center space-x-2 mt-4  lg:mt-0 mx-10 ${isOpen ? "flex" : "hidden"}`}>
                    <a href="/login">
                        <button className="px-4 h-10 font-semibold rounded-xl hover:text-white hover:bg-black transition-all">Log In</button>
                    </a>
                    <a href="/signup">
                        <button className="px-4 h-10 font-semibold rounded-xl bg-[#F9A826] hover:text-white hover:bg-black transition-all">Sign Up</button>
                    </a>
                </div>
            </div>
            
        </nav>
    );
}
