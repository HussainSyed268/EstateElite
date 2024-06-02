import React from "react";
import Cart from '../assets/icons/cart.png';

export default function AdminCards(props) {
    return(
        <>
           <div className="rounded-lg w-1/5  ml-5 mt-4 border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark shadow-md">
              <div className="ml-6">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black dark:bg-meta-4">
                <img className="w-6 h-6" src={props.img} alt="" />
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-black dark:text-white">
                    {props.detail}
                  </h4>
                  <span className=" font-medium">{props.title}</span>
                </div>
                  </div>
              </div>
            </div>

                    </>
                )}