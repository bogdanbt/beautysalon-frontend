import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";
import { BASE_API_URL } from "../api";
export default function CreateMasterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BASE_API_URL}/api/masters/full-create`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const createdMaster = res.data;
      alert("Master created ✅");
      navigate(`/admin/staff/${createdMaster.id}`);
    } catch (err) {
      alert("Error while creating master ❌");
    }
  };

  return (
    <main className="admin-page">
      <section className="admin-section">
        <h1>Create New Master</h1>

        <form className="admin-form" onSubmit={handleCreate}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="admin-add-btn">
            ➕ Create Master
          </button>
        </form>
      </section>
    </main>
  );
}
