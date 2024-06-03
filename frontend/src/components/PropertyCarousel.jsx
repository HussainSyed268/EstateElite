import React from "react";
import PropertyCard from "./Propertycard";
import Property1 from "../assets/property1.jpg";

export default function PropertyCarousel() {
    return (
        <>
            <div className="mt-12 flex flex-col justify-start items-start">
                <h1 className="text-3xl font-raleway font-semibold my-10 ml-20 text-[#242424]">
                    Top Rated Properties
                </h1>
               
                <div className="carousel-center carousel rounded-box w-full space-x-8 mb-20  overflow-x-scroll px-20">
                    <div className=" min-w-[300px] flex-shrink-0 carousel-item">
                        <PropertyCard img={Property1} title="Villa" description="Beautiful villa with a pool" price="100,000" type="House"/>
                    </div>
                    <div className="min-w-[300px] flex-shrink-0 carousel-item">
                        <PropertyCard img={Property1} title="Villa" description="Beautiful villa with a pool" price="100,00,00" type="House"/>
                    </div>
                    <div className="min-w-[300px] flex-shrink-0 carousel-item">
                        <PropertyCard img={Property1} title="Villa" description="Beautiful villa with a pool" price="100,00,00" type="House"/>
                    </div>
                    <div className="min-w-[300px] flex-shrink-0 carousel-item">
                        <PropertyCard img={Property1} title="Villa" description="Beautiful villa with a pool" price="100,00,00" type="House"/>
                    </div>
                </div>
              
            </div>
        </>
    );
}
