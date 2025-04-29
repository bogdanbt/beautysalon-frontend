import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css"; // Подключаем CSS
import { BASE_API_URL } from "../api";
export default function CreateServicePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    description: "",
    duration: 0,
    price: 0,
    category: "",
    photoUrl: "", // ➕ новое поле
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      const res = await axios.post(`${BASE_API_URL}/api/services`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Service created ✅");
      navigate(`/admin/services/${res.data.id}`);
    } catch {
      alert("Error while creating service ❌");
    }
  };

  return (
    <main className="admin-page">
      <section className="admin-section">
        <h1>Create a New Service</h1>

        <form
          className="admin-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
        >
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Service name"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Service description"
              required
            />
          </div>

          <div className="form-group">
            <label>Duration (min)</label>
            <input
              name="duration"
              type="number"
              value={form.duration}
              onChange={handleChange}
              placeholder="Duration in minutes"
              required
            />
          </div>

          <div className="form-group">
            <label>Price (CHF)</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Price in CHF"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category"
              required
            />
          </div>

          <div className="form-group">
            <label>Photo URL</label>
            <input
              name="photoUrl"
              value={form.photoUrl}
              onChange={handleChange}
              placeholder="Link to service photo"
            />
          </div>

          <div className="admin-form-buttons">
            <button type="submit" className="admin-add-btn">
              💾 Create
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
