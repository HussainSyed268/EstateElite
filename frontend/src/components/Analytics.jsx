import React from "react";
import AdminCards from "../components/AdminCards";
import Cart from '../assets/icons/cart.png';
import Building from '../assets/icons/building.png';
import Team from "../assets/icons/team.png";

export default function Analytics() {
    return (
        <div className="flex flex-wrap justify-center mt-4 mx-10">
            <div className="w-full md:w-1/2 lg:w-1/4 p-2">
                <AdminCards img={Cart} detail={"$45.2 K"} title={"Total Profit"} />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-2">
                <AdminCards img={Building} detail={"24"} title={"Total Properties Listed"} />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-2">
                <AdminCards img={Team} detail={"250"} title={"Total Users"} />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-2">
                <AdminCards img={Cart} detail={"$45.2 K"} title={"Total Profit"} />
            </div>
        </div>
    );
}
