import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Admin.css";
import { BASE_API_URL } from "../api";
export default function SingleStaffEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    active: true,
    onVacation: false,
    serviceIds: [],
    schedule: {},
    photoUrl: "",
  });

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [masterRes, servicesRes] = await Promise.all([
          axios.get(`${BASE_API_URL}/api/masters/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_API_URL}/api/services`),
        ]);
        setForm(masterRes.data);
        setServices(servicesRes.data);
      } catch {
        alert("Failed to load data");
      }
    };
    fetchData();
  }, [id, token]);

  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_API_URL}/api/masters/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Changes saved ✅");
      navigate(`/admin/staff/${id}`);
    } catch {
      alert("Failed to save changes ❌");
    }
  };

  const deleteMaster = async () => {
    if (!window.confirm("Are you sure you want to delete this master?")) return;
    try {
      await axios.delete(`${BASE_API_URL}/api/masters/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Master deleted ✅");
      navigate("/admin/staff");
    } catch {
      alert("Failed to delete master ❌");
    }
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  return (
    <main className="admin-page">
      <section className="admin-section">
        <h1>Edit Master</h1>

        <form className="admin-form" onSubmit={saveChanges}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Photo URL</label>
            <input
              type="text"
              placeholder="Enter photo link"
              value={form.photoUrl}
              onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
            />
          </div>
          <div className="form-group-checkbox">
            <label>
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              Active
            </label>
          </div>

          <div className="form-group-checkbox">
            <label>
              <input
                type="checkbox"
                checked={form.onVacation}
                onChange={(e) =>
                  setForm({ ...form, onVacation: e.target.checked })
                }
              />
              On Vacation
            </label>
          </div>

          <div className="form-group">
            <label>Services</label>
            <div className="admin-services-checkboxes">
              {services.map((service) => (
                <label key={service.id}>
                  <input
                    type="checkbox"
                    checked={form.serviceIds.includes(service.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm({
                          ...form,
                          serviceIds: [...form.serviceIds, service.id],
                        });
                      } else {
                        setForm({
                          ...form,
                          serviceIds: form.serviceIds.filter(
                            (sid) => sid !== service.id
                          ),
                        });
                      }
                    }}
                  />
                  {service.name}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Schedule</label>
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
                  {hours.map((time) => (
                    <tr key={time}>
                      <td>{`${time} – ${String(parseInt(time) + 1).padStart(
                        2,
                        "0"
                      )}:00`}</td>
                      {days.map((day) => (
                        <td key={day}>
                          <input
                            type="checkbox"
                            checked={
                              form.schedule?.[day]?.includes(time) || false
                            }
                            onChange={(e) => {
                              const newSchedule = { ...form.schedule };
                              if (!newSchedule[day]) newSchedule[day] = [];
                              if (e.target.checked) {
                                newSchedule[day].push(time);
                              } else {
                                newSchedule[day] = newSchedule[day].filter(
                                  (t) => t !== time
                                );
                              }
                              setForm({ ...form, schedule: newSchedule });
                            }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="admin-form-buttons">
            <button type="submit" className="admin-add-btn">
              💾 Save Changes
            </button>
            <button
              type="button"
              className="admin-delete-btn"
              onClick={deleteMaster}
            >
              🗑 Delete Master
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
