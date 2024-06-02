import React from "react";
import PropertyCard from "./Property"
import Image from "../assets/property1.jpg"
export default function PropertyManager(){
    return(
        <>
            <div className="bg-black flex flex-col  w-[93%] h-[37rem] text-white mx-12 ml-[3.5rem] mt-12 rounded-lg">
                <div className="flex justify-between">
                    <h1 className="text-3xl  font-medium  px-10 text-[#F9A826] pt-8">
                        Properties Overview
                    </h1>
                    <a href=""><p className="text-white pr-16 pt-9 text-sm underline hover:text-[#F9A826] hover:font-semibold transition-all">
                        Manage Properties
                    </p></a>
                </div >
                <div className="flex flex-col justify-center pt-6">
                <div className="flex w-[93%]  border-b-2 border-gray-800 pb-2 mt-5 justify-between font-semibold mx-10">
                    <div className="px-4 text-center w-1/4">
                        Photo
                    </div>
                    <div className="px-4 text-center w-1/4">
                        Customer
                    </div>
                    <div className="px-4 text-center w-1/4">
                        Property
                    </div>
                    <div className="px-4 text-center w-1/4">
                        Type
                    </div>
                </div>
                <PropertyCard
                    img={Image}
                    name={"John Doe"}
                    property={"DHA Villa"}
                    type={"Villa"}
                />
                <PropertyCard
                    img={Image}
                    name={"John Doe"}
                    property={"DHA Villa"}
                    type={"Villa"}
                />
                <PropertyCard
                    img={Image}
                    name={"John Doe"}
                    property={"DHA Villa"}
                    type={"Villa"}
                />
                <PropertyCard
                    img={Image}
                    name={"John Doe"}
                    property={"DHA Villa"}
                    type={"Villa"}
                />

            </div>
            </div>
        </>
    )

}