import { BASE_API_URL } from "../api";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Profile.css";

export default function Profile() {
  const [role, setRole] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = JSON.parse(atob(token.split(".")[1])); // JWT payload
    setRole(decoded.role);
    setUserId(decoded.userId);

    if (decoded.role === "client") {
      axios
        .get(`${BASE_API_URL}/api/appointments/my`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setAppointments(res.data))
        .catch(() => alert("Failed to load appointments"));
    }
  }, []);

  return (
    <main className="profile-page">
      <section className="profile-header">
        <h1>Profile</h1>
        {role === "admin" ? (
          <p className="welcome-text">Welcome, Admin!</p>
        ) : (
          <p className="welcome-text">Good day, dear client!</p>
        )}
      </section>

      {role === "client" && (
        <section className="appointments-section">
          <h2>Your Appointments</h2>
          {appointments.length === 0 ? (
            <p className="no-appointments">You have no appointments yet.</p>
          ) : (
            <ul className="appointments-list">
              {appointments.map((a) => (
                <li key={a.id} className="appointment-card">
                  <div className="appointment-info">
                    <p className="appointment-date">
                      📅 {a.date} at {a.time}
                    </p>
                    <p className="appointment-service">
                      <strong>{a.serviceName}</strong> with {a.masterName}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}
