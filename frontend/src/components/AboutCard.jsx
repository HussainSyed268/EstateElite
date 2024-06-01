import React from "react";

export default function AboutCard(props) {  
    return (
        <div className="flex flex-col justify-normal px-4 pb-10 rounded-xl text-left w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border border-gray-400">
            <img className="w-[10rem] p-4 mx-auto" src={props.image} alt={props.title} />
            <h1 className="text-3xl font-semibold my-4 text-[#242424]">
                {props.title}
            </h1>
            <p className="text-lg font-roboto">
                {props.description}
            </p>
        </div>
    );
}
