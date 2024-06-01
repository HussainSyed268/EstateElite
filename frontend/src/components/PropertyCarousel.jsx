import React from "react";
import PropertyCard from "./Propertycard";
import Property1 from "../assets/property1.jpg";

export default function PropertyCarousel() {
    return (
        <>
            <div className="mt-12 flex flex-col justify-center items-center">
                <h1 className="text-3xl font-semibold text-center my-10 text-[#242424]">
                    Top Rated Properties
                </h1>
                <div className="carousel-center carousel flex items-center justify-center w-2/3 mx-4 space-x-5 py-5">
                    <div className=" min-w-[300px] flex-shrink-0 carousel-item">
                        <PropertyCard img={Property1} title="Villa" description="Beautiful villa with a pool" />
                    </div>
                    <div className="min-w-[300px] flex-shrink-0 carousel-item">
                        <PropertyCard img={Property1} title="Villa" description="Beautiful villa with a pool" />
                    </div>
                    <div className="min-w-[300px] flex-shrink-0 carousel-item">
                        <PropertyCard img={Property1} title="Villa" description="Beautiful villa with a pool" />
                    </div>
                    <div className="min-w-[300px] flex-shrink-0 carousel-item">
                        <PropertyCard img={Property1} title="Villa" description="Beautiful villa with a pool" />
                    </div>
                </div>
            </div>
        </>
    );
}
