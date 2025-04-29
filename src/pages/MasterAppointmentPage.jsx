import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MasterAppointmentPage.css";
import { BASE_API_URL } from "../api";
export default function MasterAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${BASE_API_URL}/api/appointments/master`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAppointments(res.data))
      .catch(() => alert("Ошибка загрузки записей мастера"));
  }, []);

  return (
    <div className="master-appointments-page">
      <h2>My Customers</h2>

      {appointments.length === 0 ? (
        <p className="empty-text">No appointments yet.</p>
      ) : (
        <div className="appointments-grid">
          {appointments.map((a) => (
            <div key={a.id} className="appointment-card">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
