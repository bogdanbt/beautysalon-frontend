import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/BookingCalendar.css";
import AuthModal from "./AuthModal";
import { BASE_API_URL } from "../api";

export default function BookingCalendar({ serviceId }) {
  const [slotsData, setSlotsData] = useState({});
  const [filteredSlots, setFilteredSlots] = useState({});
  const [masters, setMasters] = useState([]);
  const [selectedMasterIds, setSelectedMasterIds] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [availableMasters, setAvailableMasters] = useState([]);
  const [selectedMasterInModal, setSelectedMasterInModal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/masters/by-service/${serviceId}`)
      .then((res) => setMasters(res.data));
  }, [serviceId]);

  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/masters/available-slots?serviceId=${serviceId}`)
      .then((res) => setSlotsData(res.data))
      .catch(() => alert("Failed to load slots"));
  }, [serviceId]);

  useEffect(() => {
    if (selectedMasterIds.length === 0) {
      setFilteredSlots(slotsData);
      return;
    }

    const filtered = {};
    Object.entries(slotsData).forEach(([date, times]) => {
      const newTimes = {};
      Object.entries(times).forEach(([time, masters]) => {
        const relevant = masters.filter((m) =>
          selectedMasterIds.includes(m.id)
        );
        if (relevant.length > 0) {
          newTimes[time] = relevant;
        }
      });
      if (Object.keys(newTimes).length > 0) {
        filtered[date] = newTimes;
      }
    });

    setFilteredSlots(filtered);
  }, [slotsData, selectedMasterIds]);

  const twoWeeksDates = Array.from({ length: 14 }, (_, i) => {
    const today = new Date();
    const day = today.getDay(); // 0 - Sunday
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);

    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date.toISOString().split("T")[0];
  });
  const handleMasterClick = (masterId) => {
    setSelectedMasterIds((prev) =>
      prev.includes(masterId)
        ? prev.filter((id) => id !== masterId)
        : [...prev, masterId]
    );
  };

  const handleDateClick = (date) => {
    const allTimes = filteredSlots[date] || {};
    if (Object.keys(allTimes).length === 0) return;

    const filteredTimes = Object.entries(allTimes).reduce(
      (acc, [time, masters]) => {
        if (masters.length > 0) acc.push({ time, masters });
        return acc;
      },
      []
    );

    if (filteredTimes.length === 0) {
      alert("No available slots for this date");
      return;
    }

    setSelectedDate(date);
    setAvailableTimes(filteredTimes.map((t) => t.time));
    setSelectedTime("");
    setAvailableMasters([]);
    setSelectedMasterInModal(null);
    setShowModal(true);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    const allMasters = filteredSlots[selectedDate]?.[time] || [];

    setAvailableMasters(allMasters);
    if (allMasters.length === 1) {
      setSelectedMasterInModal(allMasters[0]);
    } else {
      setSelectedMasterInModal(null);
    }
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime || !selectedMasterInModal) {
      alert("Please select time and master");
      return;
    }

    const booking = {
      date: selectedDate,
      time: selectedTime,
      masterId: selectedMasterInModal.id,
      serviceId,
    };

    if (isAuthenticated) {
      axios
        .post(`${BASE_API_URL}/api/appointments`, booking, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert("Booking successfully created");
          window.location.href = "/profile";
        })
        .catch(() => alert("Failed to create booking"));
    } else {
      localStorage.setItem("pendingBooking", JSON.stringify(booking));
      setShowModal(false);
      setShowAuthModal(true);
    }
  };

  const handleAuth = () => {
    const url =
      authMode === "login"
        ? `${BASE_API_URL}/api/auth/login`
        : `${BASE_API_URL}/api/auth/register`;

    axios
      .post(url, { email, password })
      .then((res) => {
        if (authMode === "register") {
          setAuthMode("login");
          alert("Registration successful. Please login.");
        } else {
          const token = res.data.token;
          const payload = JSON.parse(atob(token.split(".")[1]));
          localStorage.setItem("token", token);
          localStorage.setItem("name", payload.sub);
          localStorage.setItem("role", payload.role);
          localStorage.setItem("userId", payload.userId);

          setShowAuthModal(false);
          const saved = localStorage.getItem("pendingBooking");
          if (saved) {
            const booking = JSON.parse(saved);
            axios
              .post(`${BASE_API_URL}/api/appointments`, booking, {
                headers: { Authorization: `Bearer ${res.data.token}` },
              })
              .then(() => {
                alert("Booking successfully created");
                localStorage.removeItem("pendingBooking");
                window.location.href = "/profile";
              });
          }
        }
      })
      .catch(() => alert("Authentication error"));
  };

  return (
    <div className="booking-container">
      <div className="master-gallery">
        {masters.map((master) => (
          <div
            key={master.id}
            className={`master-card ${
              selectedMasterIds.includes(master.id) ? "selected" : ""
            }`}
            onClick={() => handleMasterClick(master.id)}
          >
            <img
              src={master.photoUrl || "https://via.placeholder.com/80"} // [ADDED] если нет фото
              alt={master.name}
              className="master-photo"
            />
            <div className="master-name">{master.name}</div>
          </div>
        ))}
      </div>

      <div className="calendar-wrapper-scroll">
        <div className="calendar-grid">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
            <div key={"head-" + idx} className="calendar-day-name">
              {day}
            </div>
          ))}

          {twoWeeksDates.map((date) => {
            const isAvailable =
              filteredSlots[date] &&
              Object.keys(filteredSlots[date]).length > 0;
            return (
              <div
                key={date}
                className={`calendar-cell ${
                  isAvailable ? "available" : "unavailable"
                }`}
                onClick={() => isAvailable && handleDateClick(date)}
              >
                {new Date(date + "T00:00").toLocaleDateString()}
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-window">
            <h4>{selectedDate}</h4>

            <div className="time-slots">
              <p>
                <strong>Select time:</strong>
              </p>
              {availableTimes.map((time) => (
                <button
                  key={time}
                  className={`slot-btn ${
                    time === selectedTime ? "selected" : ""
                  }`}
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </button>
              ))}
            </div>

            {selectedTime && (
              <>
                <p>
                  <strong>Select master:</strong>
                </p>
                <div className="master-gallery-modal">
                  {availableMasters.map((m) => (
                    <div
                      key={m.id}
                      className={`master-card ${
                        selectedMasterInModal?.id === m.id ? "selected" : ""
                      }`}
                      onClick={() => setSelectedMasterInModal(m)}
                    >
                      <img
                        src={m.photoUrl || "https://via.placeholder.com/80"}
                        alt={m.name}
                        className="master-photo"
                      />
                      <div className="master-name">{m.name}</div>
                    </div>
                  ))}
                  {availableMasters.length === 0 && <p>No available masters</p>}
                </div>
              </>
            )}

            <div className="modal-actions">
              <button className="btn-confirm" onClick={handleConfirm}>
                Confirm
              </button>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showAuthModal && (
        <AuthModal
          authMode={authMode}
          setAuthMode={setAuthMode}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleAuth={handleAuth}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
}
