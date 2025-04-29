import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Admin.css";
import { BASE_API_URL } from "../api";
export default function SingleServiceEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    description: "",
    duration: 0,
    price: 0,
    category: "",
    photoUrl: "", // ➕ добавляем фото
  });

  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setForm(res.data))
      .catch(() => alert("Failed to load service"));
  }, [id, token]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_API_URL}/api/services/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Service updated ✅");
      navigate(`/admin/services/${id}`);
    } catch {
      alert("Error while saving ❌");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="admin-page">
      <section className="admin-section">
        <h1>Edit Service</h1>

        <form className="admin-form" onSubmit={handleSave}>
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Service Name"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Service Description"
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
              💾 Save Changes
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
