import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Admin.css";
import { BASE_API_URL } from "../api";
export default function SingleServicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setService(res.data))
      .catch(() => alert("Failed to load service"));
  }, [id, token]);

  if (!service) return <div>Loading...</div>;

  return (
    <main className="admin-page">
      <section className="admin-section">
        <h1>Service Information</h1>

        <div className="admin-service-wrapper">
          {service.photoUrl ? (
            <img
              src={service.photoUrl}
              alt={service.name}
              className="admin-service-photo-large"
            />
          ) : (
            <div className="admin-service-photo-placeholder-large">
              No Image
            </div>
          )}

          <div className="admin-service-details">
            <p>
              <strong>Name:</strong> {service.name}
            </p>
            <p>
              <strong>Description:</strong> {service.description}
            </p>
            <p>
              <strong>Category:</strong> {service.category}
            </p>
            <p>
              <strong>Duration:</strong> {service.duration} min
            </p>
            <p>
              <strong>Price:</strong> {service.price} CHF
            </p>

            <button
              className="admin-add-btn"
              onClick={() => navigate(`/admin/services/${id}/edit`)}
            >
              ✏️ Edit
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
