import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import ManageProperty from "../components/ManageProperty";
import AdminLayout from "../layout/AdminLayout";

export default function AdminPanel() {
    const [selectedTab, setSelectedTab] = useState('Dashboard'); // State to track selected tab

    return (
        <AdminLayout>
            <div className="w-full">
                {/* Render components based on selected tab */}
                {selectedTab === 'Dashboard' && <Dashboard />}
                {selectedTab === 'Manage Properties' && <ManageProperty />}
                {/* {selectedTab === 'Approval' && <ApprovalComponent />} */}
                {/* {selectedTab === 'Manage Profile' && <ManageProfileComponent />} */}
            </div>
        </AdminLayout>
    );
}
