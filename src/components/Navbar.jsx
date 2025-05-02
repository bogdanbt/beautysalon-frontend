import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    
<nav className="navbar">
  <div className="container">
    <Link to="/" className="nav-logo">Beauty Salon</Link>

    {/* Burger menu checkbox */}
    <input type="checkbox" id="menu-toggle" className="menu-toggle" />
    <label htmlFor="menu-toggle" className="burger">
      <span></span>
      <span></span>
      <span></span>
    </label>

    <ul className="nav-links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/services">All Services</Link></li>

      {!token && (
        <>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </>
      )}

      {token && role === "client" && (
        <>
          <li><Link to="/profile">My Profile</Link></li>
          <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
        </>
      )}

      {token && role === "admin" && (
        <>
          <li><Link to="/admin/profile">Admin Profile</Link></li>
          <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
        </>
      )}

      {token && role === "master" && (
        <>
          <li><Link to="/master-profile">Master Profile</Link></li>
          <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
        </>
      )}
    </ul>
  </div>
</nav>

  );
}

