import React from "react"
import DashboardNav from "../components/DashboardNav";
import Analytics from "../components/Analytics";
import PropertyManager from "../components/PropertyManager";
export default function Dashboard() {
    return(
        <>
              <DashboardNav/>
              <div className="w-full">
                <Analytics/>
                <PropertyManager/>
              </div>  
              </>
    )}