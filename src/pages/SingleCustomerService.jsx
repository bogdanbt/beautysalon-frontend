import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BookingCalendar from "../components/BookingCalendar";
import "../styles/SingleCustomerService.css";
import { BASE_API_URL } from "../api";
export default function SingleCustomerService() {
  const { id } = useParams(); // serviceId
  const [service, setService] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedMaster, setSelectedMaster] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/services/${id}`)
      .then((res) => setService(res.data))
      .catch(() => alert("Failed to load service"));
  }, [id]);

  const handleBooking = () => {
    if (!date || !time || !selectedMaster) {
      alert("Please select date, time and master.");
      return;
    }

    const bookingData = {
      serviceId: id,
      date,
      time,
      masterId: selectedMaster,
    };

    if (!token) {
      localStorage.setItem("pendingBooking", JSON.stringify(bookingData));
      navigate("/login");
    } else {
      axios
        .post(`${BASE_API_URL}/api/appointments`, bookingData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert("You have successfully booked!");
          navigate("/profile");
        })
        .catch(() => alert("Failed to create booking"));
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("pendingBooking");
    if (saved && token) {
      const parsed = JSON.parse(saved);
      localStorage.removeItem("pendingBooking");
      axios
        .post(`${BASE_API_URL}/api/appointments`, parsed, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert("Booking completed after login ✅");
          navigate("/profile");
        })
        .catch(() => alert("Failed to complete booking ❌"));
    }
  }, [token, navigate]);

  if (!service)
    return <div className="loading">Loading service details...</div>;

  return (
    <main className="single-service-page">
      <section className="service-section">
        <article className="single-service-card">
          <div className="single-service-card-content">
            <h2>{service.name}</h2>
            <p className="service-description">{service.description}</p>
            <p>
              <strong>Price:</strong> {service.price} CHF
            </p>
            <p>
              <strong>Duration:</strong> {service.duration} min
            </p>
            <p>
              <strong>Category:</strong> {service.category}
            </p>
          </div>

          {service.photoUrl ? (
            <img
              src={service.photoUrl}
              alt={service.name}
              className="single-service-photo-large"
            />
          ) : (
            <div className="single-service-photo-placeholder-large">
              No Image
            </div>
          )}
        </article>
      </section>

      <section className="booking-section">
        <h3>Book an Appointment</h3>
        <BookingCalendar
          serviceId={id}
          onSelect={(selectedDate, selectedTime, master) => {
            setDate(selectedDate);
            setTime(selectedTime);
            setSelectedMaster(master.id);
          }}
        />
        <button className="book-btn" onClick={handleBooking}>
          Book Now
        </button>
      </section>
    </main>
  );
}
