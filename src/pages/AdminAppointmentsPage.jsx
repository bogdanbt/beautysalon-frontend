import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Admin.css";
import { BASE_API_URL } from "../api";
export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/appointments/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAppointments(res.data))
      .catch(() => alert("Failed to load appointments"));
  }, [token]);

  return (
    <main className="admin-page">
      <section className="admin-section">
        <h1>All Appointments</h1>

        {appointments.length === 0 ? (
          <p className="admin-empty-text">No appointments found.</p>
        ) : (
          <ul className="admin-appointments-grid">
            {appointments.map((a) => (
              <li key={a.id} className="admin-appointment-card">
                <p>
                  <strong>Master:</strong> {a.masterName}
                </p>
                <p>
                  <strong>Client:</strong> {a.clientEmail}
                </p>
                <p>
                  <strong>Service:</strong> {a.serviceName}
                </p>
                <p>
                  <strong>Date:</strong> {a.date}
                </p>
                <p>
                  <strong>Time:</strong> {a.time}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
