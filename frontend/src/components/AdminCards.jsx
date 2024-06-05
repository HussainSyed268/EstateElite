import React from "react";
import Cart from '../assets/icons/cart.png';

export default function AdminCards(props) {
    return(
        <div className="rounded-lg border border-stroke bg-[#F9A826] text-black px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark shadow-md">
            <div className="flex justify-end mr-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black dark:bg-meta-4">
                    <img className="w-6 h-6 " src={props.img} alt="" />
                </div>
            </div>
            <div className="mt-4 flex items-end justify-between ml-6">
                <div>
                    <h4 className="text-2xl font-bold dark:text-white">
                        {props.detail}
                    </h4>
                    <span className="text-sm">{props.title}</span>
                </div>
            </div>
        </div>
    );
}