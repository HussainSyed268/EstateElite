import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardNav from "../components/DashboardNav";
import Analytics from "../components/Analytics";
import PropertyManager from "../components/PropertyManager";

export default function AdminPanel(){
    return(
        <>
        <div className="flex">
            <Sidebar/>
            <div className="w-full">
                <DashboardNav/>
              <div>
                <Analytics/>
                <PropertyManager/>
              </div>  
            </div>
        </div>
        </>
    )
}