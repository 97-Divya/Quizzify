import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Login = ({ setUserRole, setUsername }) => {
  const [username, setLocalUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/user/login", { username, password });
      const role = res.data;

      localStorage.setItem("username", username);
      localStorage.setItem("role", role);

      setUsername(username);
      setUserRole(role);

      navigate(`/dashboard/${role}`);
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Log in</h2>
        <p className="auth-subtitle">to start learning</p>
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setLocalUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">Log in →</button>
        </form>
        <p className="auth-footer">
          Don't have an account? <span className="auth-link" onClick={() => navigate("/register")}>Sign up now</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
