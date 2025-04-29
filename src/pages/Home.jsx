import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";
import { BASE_API_URL } from "../api";
export default function Home() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${BASE_API_URL}/api/services`);
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Unable to load services. Please try again later.");
      }
    };

    fetchServices();
  }, []);

  return (
    <main className="home-page">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Indulge In Timeless Beauty</h1>
          <p>
            Awaken Your Inner Glow. Revitalize Your Skin. Unleash Your Skin's
            True Potential.
          </p>
          <Link to="/services">
            <button className="book-btn">All Services</button>
          </Link>
        </div>

        <figure className="hero-image-wrapper">
          <img
            src="/images/beauty-hero.jpg"
            alt="Beauty treatment"
            className="hero-image"
          />
        </figure>
      </header>

      {/* Services Section */}
      <section className="services-section">
        <h2>Our Services</h2>
        {error && <p className="error">{error}</p>}

        <ul className="services-grid">
          {services.slice(0, 3).map((service) => (
            <li className="service-card fade-in-up" key={service.id}>
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
                <p>{service.description}</p>
                <p className="price">${service.price}</p>
                <a href={`/services/${service.id}`} className="service-btn">
                  View Service
                </a>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* Discover Section */}
      <section className="discover-section">
        <div className="discover-content">
          <h2>Discover The Natural Beauty</h2>
          <p>Cheers to healthy natural skin! Nourish. Hydrate. Transform.</p>
        </div>
        <div className="discover-images">
          <figure>
            <img
              src="/images/model1.jpg"
              alt="Smiling woman"
              className="discover-img"
            />
          </figure>
          <figure>
            <img
              src="/images/model2.jpg"
              alt="Another happy woman"
              className="discover-img"
            />
          </figure>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>Our Customers Believe In Our Quality</h2>
        <ul className="testimonials-grid">
          <li className="testimonial-card fade-in-up">
            <blockquote>
              <p>
                “Amazing experience! Highly recommend their skincare
                treatments.”
              </p>
              <footer>— Sara ★★★★★</footer>
            </blockquote>
          </li>
          <li className="testimonial-card fade-in-up">
            <blockquote>
              <p>
                “Professional service and wonderful results. My skin feels
                renewed!”
              </p>
              <footer>— Emily ★★★★★</footer>
            </blockquote>
          </li>
          <li className="testimonial-card fade-in-up">
            <blockquote>
              <p>“The staff is friendly, and the atmosphere is so relaxing.”</p>
              <footer>— Olivia ★★★★★</footer>
            </blockquote>
          </li>
        </ul>
      </section>
    </main>
  );
}
