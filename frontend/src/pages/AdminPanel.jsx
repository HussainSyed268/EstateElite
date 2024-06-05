// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "../components/Dashboard";
// import ManagePropertyPage from "./ManagePropertyPage";
// import AdminLayout from "../layout/AdminLayout";
// import Approval from "../components/Approval";
// import UpdateProfile from "../components/UpdateProfile";
// import ManageUserPage from "../pages/ManageUserPage"
// import { ThemeProvider } from "@mui/system";
// import theme from "../theme";

// export default function AdminPanel() {
//   return (
//     <Router>
//             <ThemeProvider theme={theme}>
//       <AdminLayout>
//         <div className="w-full">
//           <Routes>
//             {/* Define routes for Dashboard and Manage Properties */}
//             <Route path="/admin" element={<Dashboard />} />
//             <Route path="/admin/properties" element={<ManagePropertyPage />} />
//             <Route path="/admin/users" element={<ManageUserPage/>} />
//             <Route path="/admin/account" element={<UpdateProfile />} />
//             <Route path="/admin/approval" element={<Approval/>} />
//             {/* Redirect to /admin if no match is found */}
//             <Route path="*" element={<Navigate to="/admin" />} />
//           </Routes>
//         </div>
//       </AdminLayout>
//             </ThemeProvider>
//     </Router>
//   );
// }