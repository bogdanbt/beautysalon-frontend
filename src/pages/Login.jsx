import { BASE_API_URL } from "../api";

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(`${BASE_API_URL}/api/auth/login`, {
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
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <h2>Welcome Back</h2>
        <p>Please enter your details to sign in</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
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

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <div className="bottom-text">
          Don't have an account? <Link to="/register">Create account</Link>
        </div>
      </section>
    </main>
  );
}
