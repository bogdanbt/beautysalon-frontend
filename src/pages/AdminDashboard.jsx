import React from "react";
import { Link } from "react-router-dom";
import "../styles/Admin.css";

export default function AdminDashboard() {
  const name = localStorage.getItem("name");

  return (
    <main className="admin-dashboard-page">
      <section className="admin-welcome-section">
        <h1>Admin Dashboard</h1>
        <p className="admin-welcome-text">Welcome, {name}!</p>
      </section>

      <section className="admin-links-section">
        <nav>
          <ul className="admin-links-grid">
            <li>
              <Link to="/admin/staff" className="admin-link-btn">Manage Staff</Link>
            </li>
            <li>
              <Link to="/admin/services" className="admin-link-btn">Manage Services</Link>
            </li>
            <li>
              <Link to="/admin/appointments" className="admin-link-btn">Manage Appointments</Link>
            </li>
          </ul>
        </nav>
      </section>
    </main>
  );
}
