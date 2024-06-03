import React from "react";

export default function PropertyCard(props){
    return(
        <>
        <div className="z-10 card w-[35rem] bg-base-100 shadow-lg mb-4">
        <figure><img src={props.img} alt="Shoes" /></figure>
        <div className="card-body">
            <h2 className="text-[1.75rem] flex justify-between card-title">
                {props.title}
                <div class="flex items-center">
                    <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <p class="ms-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
                </div>
            </h2>
            <p className="text-stone-500">{props.description}</p>
            <div className="card-actions justify-end">
            <div className="badge badge-outline">Villa</div> 
            <div className="badge badge-outline">Luxury</div>
            </div>
        </div>
        </div>
        </>
    )
}