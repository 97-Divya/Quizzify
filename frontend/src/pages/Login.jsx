import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setUserRole, setUsername }) => {
  const [usernameLocal, setUsernameLocal] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        username: usernameLocal,
        password,
      });
      const role = res.data;

      // Update global App state
      setUserRole(role);
      setUsername(usernameLocal);

      navigate(`/dashboard/${role}`);
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ mt: 8, p: 4, backgroundColor: "background.paper" }} elevation={3}>
        <Typography variant="h4" mb={3} align="center">Login</Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={usernameLocal}
            onChange={(e) => setUsernameLocal(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
