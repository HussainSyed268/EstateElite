import React from "react";
import HomeLogo from '../assets/home.png';

export default function HomeSection() {
    return (
        <>
            <div className="relative flex flex-col md:flex-row h-auto max-[768px]:h-[53rem] min-[768px]:h-[30rem] min-[1024px]:h-[35rem] min-[1400px]:h-[50rem] rounded-md justify-between font-medium items-center mx-4 bg-custom-gradient text-[#242424]">
                <div className="max-[768px]:mx-12  min-[768px]:w-[65rem] min-[1200px]:w-1/2 ml-[4rem] min-[1400px]:ml-[5rem]">
                    <h1 className=" max-[768px]:text-center max-[768px]:text-[3rem] max-[768px]:mt-12 min-[768px]:text-[2rem] min-[1024px]:text-[3rem] min-[1400px]:text-[5rem] font-semibold font-raleway text-left leading-tight">
                        Manage Your Property with <span className="text-[#F9A826] font-philosopher">EstateElite</span>
                    </h1>
                    <p className=" max-[768px]:text-center font-raleway text-xl py-8 text-left font-semibold">
                        EstateElite is a property management platform that helps you manage your properties with ease.
                    </p>
                    <div className="flex justify-start max-[768px]:justify-center">
                        <button className="px-4 h-10 font-semibold rounded-xl bg-[#F9A826] hover:text-white hover:bg-black transition-all ">Get Started</button>
                    </div>
                </div>
                <div className="min-[1200px]:w-1/2 flex justify-center  m">
                    <img className="min-[500px]:w-[30rem] min-[768px]:w-[60rem] md:w-[40rem lg:w-[50rem] " src={HomeLogo} alt="illustration" />
                </div>
            </div>
        </>
    );
}
