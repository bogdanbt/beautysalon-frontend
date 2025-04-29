import React from "react";
import "../styles/AuthModal.css";

export default function AuthModal({ authMode, setAuthMode, email, setEmail, password, setPassword, handleAuth, onClose }) {
  return (
    <div className="auth-modal-backdrop">
    <div className="auth-modal-window">
      <button className="auth-close-btn" onClick={onClose}>×</button> {/* Оставляем только этот крестик */}
      
      <h4>{authMode === "login" ? "Login" : "Register"}</h4>
      
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth} className="auth-submit-btn">
  {authMode === "login" ? "Login" : "Register"}
</button>

  
      <p>
        {authMode === "login"
          ? "Don't have an account? "
          : "Already have an account? "}
        <span
          className="auth-switch"
          onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
        >
          {authMode === "login" ? "Register" : "Login"}
        </span>
      </p>
    </div>
  </div>
  
  );
}
