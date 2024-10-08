//Create a simple footer component

import React from 'react';
import Logo from '../assets/logoFin.png';

const Footer = () => {
    return (
        <footer className=" mt-0 bg-[#fafafa] shadow darkremoveg-gray-900 p-1 border-2 rounded-t-xl font-raleway">
        <div
            className="grid md:grid-cols-4 grid-cols-1 gap-4  w-full p-1 [&>ul]:border-gray-400 [&>ul]:border-l-2 [&>ul]:p-2 [&>ul>li]:text-one [&>ul>li]:font-bold [&>ul]:md:my-6 [&>ul]:my-0 [&>ul>li]:cursor-pointer">
            <div className=" flex md:justify-center items-center justify-start md:ml-0 ml-3">
                <img src={Logo} alt="logo" className="w-[180px]" />
            </div>
            <ul className="flex flex-col h-24 [&>li]:my-2 justify-center ">
                <li className=' hover:text-[#F9A826]'>
                    <a href="/find">
                        <p>Find Property</p>
                    </a>
                </li>
                <li className=' hover:text-[#F9A826]'>
                    <a href="/add-property">
                        <p>List Property</p>
                    </a>
                </li>
            </ul>
            <ul className=" flex flex-col [&>li]:my-2 justify-center h-24">
                <li className=' hover:text-[#F9A826]'>
                    <a href="/about">
                        <p>About</p>
                    </a>
                </li>
                <li className=' hover:text-[#F9A826]'>
                    <a href="/contact-us">
                        <p>Contact us</p>
                    </a>
                </li>
            </ul>
            <ul className=" flex flex-col [&>li]:my-2 justify-center my-2 h-24">
                <li className=' hover:text-[#F9A826]'>
                    <a href="mailto:diljo@diljo.com">Send email</a>
                </li>
                <li className=' hover:text-[#F9A826]'>
                    <label className={"cursor-pointer"} htmlFor={"terms-and-conditions"}>Terms and Conditions</label>
                </li>
            </ul>
        </div>
    </footer>

    );
}

export default Footer;