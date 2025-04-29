import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Admin.css";
import { BASE_API_URL } from "../api";

export default function AdminStaffPage() {
  const [masters, setMasters] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/masters`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMasters(res.data))
      .catch(() => alert("Failed to load staff"));
  }, [token]);

  return (
    <main className="admin-page">
      <section className="admin-section">
        <div className="admin-header">
          <h1>Staff</h1>
          <button
            className="admin-add-btn"
            onClick={() => navigate("/admin/create-master")}
          >
            ➕ Create New Master
          </button>
        </div>

        {masters.length === 0 ? (
          <p className="admin-empty-text">No staff found.</p>
        ) : (
          <ul className="admin-staff-grid">
            {masters.map((master) => (
              <li key={master.id} className="admin-staff-card">
                {master.photoUrl ? (
                  <img
                    src={master.photoUrl}
                    alt={master.name}
                    className="admin-staff-photo"
                  />
                ) : (
                  <div className="admin-staff-photo-placeholder">No Photo</div>
                )}

                <h3>{master.name}</h3>
                <p>{master.active ? "🟢 Active" : "🔴 Inactive"}</p>
                <p>{master.onVacation ? "🏖 On Vacation" : "💼 Working"}</p>
                <Link
                  to={`/admin/staff/${master.id}`}
                  className="admin-view-link"
                >
                  View
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
