import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CustomerServicesPage.css";
import { BASE_API_URL } from "../api";
export default function CustomerServicesPage() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/services`)
      .then((res) => setServices(res.data))
      .catch(() => alert("Failed to load services"));
  }, []);

  return (
    <main className="services-page">
      <section className="services-section">
        <h2>Our Treatments</h2>
        {services.length === 0 && (
          <p className="error">No services available yet</p>
        )}
        <ul className="services-grid">
          {services.map((service) => (
            <li className="service-card" key={service.id}>
              {service.photoUrl ? (
                <img
                  src={service.photoUrl}
                  alt={service.name}
                  className="service-photo"
                />
              ) : (
                <div className="service-photo-placeholder">No Image</div>
              )}
              <article>
                <h3>{service.name}</h3>
                <p className="service-description">
                  {service.description.slice(0, 100)}...
                </p>
                <p>
                  <strong>Price:</strong> {service.price} CHF
                </p>
                <p>
                  <strong>Duration:</strong> {service.duration} min
                </p>
                <button
                  className="learn-more-btn"
                  onClick={() => navigate(`/services/${service.id}`)}
                >
                  Learn More
                </button>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
