import React from "react";
import Search from '../assets/search.png';
import Cash from '../assets/cash.png';
import Expert from '../assets/expert.png';
import AboutCard from "./AboutCard";

export default function AboutUs() {
    return (
        <>
            <div className="font-raleway my-32 text-[#242424]">
            <h1 className="text-xl  mb-4 mx-8 font-semibold text-slate-500  text-center">
                    Finding home never been this easy
                </h1>
                <h1 className="lg:text-6xl text-5xl  mx-8 font-semibold  text-center">
                    Everything should be this easy
                </h1>
                <div className="flex flex-wrap gap-16 justify-center mt-16">
                    <AboutCard image={Search}  title="Streamlined Property Search" description="Our advanced search tools allow you to filter properties based on your specific needs and preferences. From price range and location to amenities and property type, we make it easy to find exactly what you're looking for." />
                    <AboutCard image={Cash} title="Transparent Buying Process" description="Say goodbye to confusing paperwork and hidden fees. Our platform provides clear, upfront information about each property, along with a seamless transaction process." />
                    <AboutCard image={Expert} title="Expert Guidance" description="Our team of experienced real estate professionals is here to guide you through the buying process. From initial search to closing the deal, we provide expert advice and support to ensure you have a smooth and successful home-buying experience." />
                </div>
            </div>
        </>
    );
}
