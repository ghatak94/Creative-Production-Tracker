import React, { useState } from "react";
import "./Login.css";

export default function LoginPage({ onLogin }) {
  const [role, setRole] = useState("creator");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin(role); // pass role to parent (App.js)
    } else {
      alert("Please enter both email and password!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">🎬 Creative Studio Login</h2>
        <p className="login-subtitle">Welcome back! Please log in to continue.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="role-switch">
            <label>
              <input
                type="radio"
                name="role"
                value="creator"
                checked={role === "creator"}
                onChange={(e) => setRole(e.target.value)}
              />
              Creator
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="marketing"
                checked={role === "marketing"}
                onChange={(e) => setRole(e.target.value)}
              />
              Marketing Team
            </label>
          </div>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login 🚀</button>
        </form>
      </div>
    </div>
  );
}
