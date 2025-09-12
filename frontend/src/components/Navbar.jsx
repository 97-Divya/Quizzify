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

          {(userRole === "instructor" || userRole === "admin") && (
            <>
              <Button color="inherit" component={Link} to="/add-quiz">Add Quiz</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}

          {userRole === "student" && (
            <>
              <Button color="inherit" component={Link} to="/take-quiz">Take Quiz</Button>
              <Button color="inherit" component={Link} to="/my-score">My Score</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
