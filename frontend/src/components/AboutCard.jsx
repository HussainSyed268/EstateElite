import React from "react";

export default function AboutCard(props) {  
    return (
        <div className="flex font-raleway flex-col justify-normal px-8 rounded-xl text-left w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div className="flex justify-start max-[768px]:justify-center">
            <img className="w-[4rem] mb-4" src={props.image} alt={props.title} />
            </div>
            <h1 className="text-3xl max-[768px]:text-center font-bold my-4 text-[#242424]">
                {props.title}
            </h1>
            <p className="text-lg">
                {props.description}
            </p>
        </div>
    );
}
