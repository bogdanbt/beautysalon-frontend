import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Admin.css";
import { BASE_API_URL } from "../api";
export default function SingleStaffPage() {
  const { id } = useParams();
  const [master, setMaster] = useState(null);
  const [services, setServices] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [masterRes, servicesRes] = await Promise.all([
          axios.get(`${BASE_API_URL}/api/masters/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_API_URL}/api/services`),
        ]);
        setMaster(masterRes.data);
        setServices(servicesRes.data);
      } catch {
        alert("Failed to load master data");
      }
    };
    fetchData();
  }, [id, token]);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  if (!master) return <p className="admin-loading-text">Loading master...</p>;

  const getServiceNames = () => {
    return master.serviceIds
      .map((id) => services.find((s) => s.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <main className="admin-page">
      <section className="admin-section">
        <div className="admin-header">
          <h1>Master Profile</h1>
          <button
            className="admin-add-btn"
            onClick={() => navigate(`/admin/staff/${id}/edit`)}
          >
            ✏️ Edit Master
          </button>
        </div>

        <article className="admin-card">
          {master.photoUrl && (
            <div className="admin-photo-wrapper">
              <img
                src={master.photoUrl}
                alt={master.name}
                className="admin-photo"
              />
            </div>
          )}

          <p>
            <strong>Name:</strong> {master.name}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {master.active ? "🟢 Active" : "🔴 Inactive"}
          </p>
          <p>
            <strong>Vacation:</strong> {master.onVacation ? "🏖 Yes" : "💼 No"}
          </p>
          <p>
            <strong>Services:</strong> {getServiceNames() || "None"}
          </p>
        </article>

        <section className="admin-schedule-section">
          <h2>Working Schedule</h2>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Time</th>
                  {days.map((day) => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00",
                  "13:00",
                  "14:00",
                  "15:00",
                  "16:00",
                  "17:00",
                ].map((time) => (
                  <tr key={time}>
                    <td>{`${time} – ${String(parseInt(time) + 1).padStart(
                      2,
                      "0"
                    )}:00`}</td>
                    {days.map((day) => (
                      <td key={day} style={{ textAlign: "center" }}>
                        {master.schedule?.[day]?.includes(time) ? "✅" : ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}
