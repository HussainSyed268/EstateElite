import React from "react";
import PropertyCard from "../components/Propertycard";
import Property1 from "../assets/property1.jpg";

export default function ManageProperty() {
    return (
        <div className="w-full overflow-y-auto">
            <h1 className="text-black font-bold text-3xl px-4 sm:px-10 pt-8"> {/* Adjust padding for small screens */}
                Manage <span className="text-[#F9A826]">Properties</span>
            </h1>
            <div className="grid grid-cols-1 gap-2 px-2 sm:px-10 min-[1500px]:grid-cols-2 ">

                <div className="mx-auto my-6"> {/* Center the cards */}
                    <PropertyCard img={Property1} title="Luxury Villa" description="A beautiful villa with a pool and garden." />
                </div>
                <div className="mx-auto my-6"> {/* Center the cards */}
                    <PropertyCard img={Property1} title="Luxury Villa" description="A beautiful villa with a pool and garden." />
                </div>
                <div className="mx-auto my-6"> {/* Center the cards */}
                    <PropertyCard img={Property1} title="Luxury Villa" description="A beautiful villa with a pool and garden." />
                </div>
            </div>
        </div>
    );
}
