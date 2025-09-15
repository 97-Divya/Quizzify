import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ userRole, setUserRole, username, setUsername }) => {
  const navigate = useNavigate();

  // Load user info from localStorage on mount
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");

    if (storedRole) setUserRole(storedRole);
    if (storedUsername) setUsername(storedUsername);
  }, [setUserRole, setUsername]);

  const handleLogout = () => {
    setUserRole("");
    setUsername("");
    localStorage.clear(); // remove everything
    navigate("/"); // redirect to login
  };

  const dashboardRoutes = {
    student: "/dashboard/student",
    instructor: "/dashboard/instructor",
    admin: "/admin",
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#00796b",
      color: "#fff"
    }}>
      <div style={{ fontWeight: "bold", fontSize: "20px" }}>MyApp</div>

      <div>
        {!userRole ? (
          <>
            <Link to="/" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate(dashboardRoutes[userRole] || "/")}
              style={buttonStyle}
            >
              Dashboard
            </button>
            <button
              onClick={handleLogout}
              style={buttonStyle}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

// Common styles
const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  marginRight: "15px",
};

const buttonStyle = {
  padding: "5px 10px",
  marginRight: "10px",
  backgroundColor: "#004d40",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default Navbar;
