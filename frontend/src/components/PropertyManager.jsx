import React from "react";
import PropertyCard from "./Property"

export default function PropertyManager(){
    return(
        <>
            <div className="bg-black h-[37rem] text-white mx-16 ml-[5.3rem] mt-8 rounded-lg">
                <div className="flex">
                    <h1 className="text-3xl font-medium px-10 text-[#F9A826] pt-4">
                        Properties Overview
                    </h1>
                </div >
                <div className="flex flex-col justify-center">
                <div className="flex w-[75%]  border-b-2 border-gray-800 pb-2 mt-5 justify-between font-semibold mx-10">
                    <div className="px-4">
                        Customer
                    </div>
                    <div className="px-4">
                        Photo
                    </div>
                    <div className="px-4">
                        Property
                    </div>
                    <div className="px-4">
                        Type
                    </div>
                </div>
                <PropertyCard/>

            </div>
            </div>
        </>
    )

}