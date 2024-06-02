// AdminLayout.jsx
import React from "react";
import Sidebar from "../components/Sidebar";

export default function AdminLayout({ children }) {
    return (
        <div className="flex h-[100vh]">
            <Sidebar />
            <div className="w-full overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
