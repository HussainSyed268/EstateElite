import React from "react";
import AdminCards from "../components/AdminCards";
import Cart from '../assets/icons/cart.png';
import Building from '../assets/icons/building.png';
import Team from "../assets/icons/team.png";

export default function Analytics() {
    return (
        <div className="flex mt-4 mx-10 flex-wrap justify-around md:justify-around">
            
            <AdminCards img={Cart} detail={"$45.2 K"} title={"Total Profit"} />
            <AdminCards img={Building} detail={"24"} title={"Total Properties Listed"} />
            <AdminCards img={Team} detail={"250"} title={"Total Users"} />
            <AdminCards img={Cart} detail={"$45.2 K"} title={"Total Profit"} />
        </div>
    );
}
