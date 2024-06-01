import React from "react";
import HomeLogo from '../assets/home.png';

export default function HomeSection() {
    return (
        <>
            <div className="relative flex flex-col md:flex-row h-auto md:h-[42rem] rounded-lg justify-between font-medium items-center mx-4 bg-custom-gradient mb-24 text-[#242424]">
                <div className="w-full md:w-1/4 ml-4 md:ml-[10rem]">
                    <p className="font-roboto md:py-2 text-left font-semibold">
                        Welcome to HomeTour
                    </p>
                    <h1 className="text-[2rem] md:text-[4rem] font-semibold text-left leading-tight">
                        Manage Your Property with <span className="text-[#F9A826]">HomeTour</span>
                    </h1>
                    <p className="font-roboto py-8 text-left font-semibold">
                        You will have everything nearby: supermarket, buses, stations, cinemas, theatres, the Carmen neighbourhood, etc.
                    </p>
                </div>
                <div className="w-full flex justify-center md:w-auto">
                    <img className="image w-full md:w-[63rem]" src={HomeLogo} alt="illustration" />
                </div>
            </div>
        </>
    );
}
