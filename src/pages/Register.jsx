import { BASE_API_URL } from "../api";

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await axios.post(`${BASE_API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });
      const token = res.data.token;
      const payload = JSON.parse(atob(token.split(".")[1]));
      localStorage.setItem("token", token);
      localStorage.setItem("name", payload.sub);
      localStorage.setItem("role", payload.role);
      localStorage.setItem("userId", payload.userId);
      navigate("/");
    } catch (err) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <main className="register-page">
      <section className="register-card">
        <h2>Create an Account</h2>
        <p>Please fill in the details below</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            register();
          }}
        >
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="register-btn">
            Sign Up
          </button>
        </form>

        <div className="bottom-text">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </section>
    </main>
  );
}
