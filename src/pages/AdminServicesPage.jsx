import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";
import { BASE_API_URL } from "../api";

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/services`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setServices(res.data))
      .catch(() => alert("Failed to load the list of services"));
  }, [token]);

  return (
    <main className="admin-page">
      <section className="admin-section">
        <div className="admin-header">
          <h1>All Services</h1>
          <button
            className="admin-add-btn"
            onClick={() => navigate("/admin/services/new")}
          >
            ➕ Add New Service
          </button>
        </div>

        {services.length === 0 ? (
          <p className="admin-empty-text">No services available.</p>
        ) : (
          <ul className="admin-services-grid">
            {services.map((service) => (
              <li key={service.id} className="admin-service-card">
                {service.photoUrl ? (
                  <img
                    src={service.photoUrl}
                    alt={service.name}
                    className="admin-service-photo"
                  />
                ) : (
                  <div className="admin-service-photo-placeholder">
                    No Image
                  </div>
                )}
                <div className="admin-service-content">
                  <h3>{service.name}</h3>
                  <p>
                    <strong>Category:</strong> {service.category}
                  </p>
                  <p>
                    <strong>Price:</strong> {service.price} CHF
                  </p>
                  <p>
                    <strong>Duration:</strong> {service.duration} min
                  </p>
                  <button
                    className="admin-view-btn"
                    onClick={() => navigate(`/admin/services/${service.id}`)}
                  >
                    👁 View
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
