import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import ManagePropertyPage from "./ManagePropertyPage";
import AdminLayout from "../layout/AdminLayout";
import AccountPage from "../pages/AccountPage";
import Approval from "../components/Approval";


export default function AdminPanel() {
  return (
    <Router>
      <AdminLayout>
        <div className="w-full">
          <Routes>
            {/* Define routes for Dashboard and Manage Properties */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/properties" element={<ManagePropertyPage />} />
            <Route path="/admin/account" element={<AccountPage />} />
            <Route path="/admin/approval" element={<Approval/>} />
            {/* Redirect to /admin if no match is found */}
            <Route path="*" element={<Navigate to="/admin" />} />
          </Routes>
        </div>
      </AdminLayout>
    </Router>
  );
}