import React from "react";
import Compass from '../assets/compass.png';
import ArrowBox from '../assets/arrow-box.png';
import Page from '../assets/page.png';
import AboutCard from "./AboutCard";

export default function AboutUs() {
    return (
        <>
            <div className="font-roboto mt-16 text-[#242424]">
                <h1 className="text-3xl font-semibold text-center">
                    Flexibility for your lifestyle
                </h1>
                <div className="mx-4 md:mx-20 flex flex-col md:flex-row md:space-x-32 mt-6 space-y-6 md:space-y-0 justify-center">
                    <AboutCard image={Compass} title="Explore" description="If something happens to your home - or any attached structures on your property - we'll cover the repairs or the rebuild" />
                    <AboutCard image={Page} title="Work Assignments" description="It's not just stuff. It's your life. And if there's ever a theft, fire, or other unfortunate event, we'll help with the repair or replacement" />
                    <AboutCard image={ArrowBox} title="Extended Stays" description="Our coverage protects you from bodily injury or property damage to others (or their stuff) at home or anywhere else" />
                </div>
            </div>
        </>
    );
}
