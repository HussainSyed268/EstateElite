import React from "react";
import Image from "../assets/property1.jpg"


export default function PropertyCard(){
    return(
        <>
            <div className="flex border-b-2  w-[75%] border-gray-800 pb-2 mt-5 justify-between font-semibold mx-10  text-white">
                <div className="px-4">
                    Juan carlos
                </div>
                <div className="px-4">
                    <img className="w-6 h-6" src={Image} alt="" />
                </div>
                <div className="px-4">
                    DHA Villa
                </div>
                <div className="px-4">
                    Villa
                </div>
            </div>
        </>
    )
}