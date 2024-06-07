import React, { useContext, useState, useEffect } from "react";
import AdminCards from "../components/AdminCards";
import Cart from '../assets/icons/cart.png';
import Building from '../assets/icons/building.png';
import Team from "../assets/icons/team.png";
import { AdminContext } from "../context/AdminContext";

export default function Analytics() {
    const { getAllUsersCount } = useContext(AdminContext);
    const { getAllPropertiesCount } = useContext(AdminContext);

    const [usersCount, setUsersCount] = useState(0);
    const [propertiesCount, setPropertiesCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllUsersCount();
                setUsersCount(data);

                const properties = await getAllPropertiesCount();
                console.log(properties);
                setPropertiesCount(properties);

            } catch (error) {
                console.error('Error fetching user count:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-wrap justify-center mt-4 mx-10">
            <div className="w-full md:w-1/2 lg:w-1/4 p-2">
                <AdminCards img={Cart} detail={"$45.2 K"} title={"Total Profit"} />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-2">
                <AdminCards img={Building} detail={propertiesCount} title={"Total Properties Listed"} />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-2">
                <AdminCards img={Team} detail={usersCount} title={"Total Users"} />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-2">
                <AdminCards img={Cart} detail={"$45.2 K"} title={"Total Profit"} />
            </div>
        </div>
    );
}
