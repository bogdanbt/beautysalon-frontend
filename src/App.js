import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminStaffPage from "./pages/AdminStaffPage";
import CreateMasterPage from "./pages/CreateMasterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SingleStaffPage from "./pages/SingleStaffPage";
import SingleStaffEditPage from "./pages/SingleStaffEditPage";
import AdminServicesPage from "./pages/AdminServicesPage";
import CreateServicePage from "./pages/CreateServicePage";
import SingleServicePage from "./pages/SingleServicePage";
import SingleServiceEditPage from "./pages/SingleServiceEditPage";
import CustomerServicesPage from "./pages/CustomerServicesPage";
import SingleCustomerService from "./pages/SingleCustomerService";
import AdminAppointmentsPage from "./pages/AdminAppointmentsPage";
import MasterAppointmentsPage from "./pages/MasterAppointmentPage";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Общие страницы */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<CustomerServicesPage />} />
        <Route path="/services/:id" element={<SingleCustomerService />} />
        {/* Профиль клиента */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute role="client">
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/master-profile"
          element={
            <ProtectedRoute role="master">
              <MasterAppointmentsPage />
            </ProtectedRoute>
          }
        />

        {/* Админ-панель */}
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/staff"
          element={
            <ProtectedRoute role="admin">
              <AdminStaffPage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute role="admin">
              <AdminAppointmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-master"
          element={
            <ProtectedRoute role="admin">
              <CreateMasterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/staff/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <SingleStaffPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/staff/:id/edit"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <SingleStaffEditPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/services"
          element={
            <ProtectedRoute>
              <AdminServicesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/services/new"
          element={
            <ProtectedRoute>
              <CreateServicePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/services/:id"
          element={
            <ProtectedRoute>
              <SingleServicePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/services/:id/edit"
          element={
            <ProtectedRoute>
              <SingleServiceEditPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


///TODO
//context api
//favicon