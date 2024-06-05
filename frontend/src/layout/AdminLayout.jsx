// AdminLayout.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import { DashboardNav } from "../components/AdminPanel/DashboardNav";
import { Outlet } from "react-router-dom";

export default function AdminLayout({ children }) {
    return (
        <div className="flex h-[100vh]">
            <Sidebar />
            <div className="w-full overflow-y-auto">
            <DashboardNav/>
                <Outlet/>
            </div>
        </div>
    );
}
