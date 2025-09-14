import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ userRole, username, setUserRole, setUsername }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserRole("");
    setUsername("");
    navigate("/");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">MyApp</Typography>

        <div>
          {!userRole && (
            <>
              <Button color="inherit" component={Link} to="/">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          )}

          {/* For all logged-in users, show only Dashboard and Logout */}
          {userRole && (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  // Redirect based on role
                  if (userRole === "student") navigate("/dashboard/student");
                  else if (userRole === "instructor") navigate("/dashboard/instructor");
                  else if (userRole === "admin") navigate("/admin");
                }}
              >
                Dashboard
              </Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
