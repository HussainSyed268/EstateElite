import React from "react";

export default function PropertyCard(props){
    return(
        <>
        <div className="z-10 card w-[35rem] bg-base-100 shadow-lg mb-4">
        <figure><img src={props.img} alt="Shoes" /></figure>
        <div className="card-body">
            <h2 className="card-title">
                {props.title}
            <div className="badge bg-[#F9A826] text-white">NEW</div>
            </h2>
            <p>{props.description}</p>
            <div className="card-actions justify-end">
            <div className="badge badge-outline">Villa</div> 
            <div className="badge badge-outline">Luxury</div>
            </div>
        </div>
        </div>
        </>
    )
}