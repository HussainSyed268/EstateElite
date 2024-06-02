import React from "react";
import Image from "../assets/property1.jpg"


export default function PropertyCard(props){
    return(
        <>
            <div className="flex border-b-2  w-[93%] border-gray-800 pb-2 pt-5 justify-between font-semibold mx-10 hover:bg-zinc-700 hover:cursor-pointer transition-all  text-white">
                <div className="px-4 w-1/4 text-center flex items-center justify-center">
                    <img className="w-20 h-12 rounded-md" src={props.img} alt="" />
                </div>
                <div className="px-4 w-1/4 text-center ">
                    {props.name}
                </div>
                <div className="px-4 w-1/4 text-center ">
                    {props.property}
                </div>
                <div className="px-4 w-1/4 text-center ">
                    {props.type}
                </div>
            </div>
        </>
    )
}