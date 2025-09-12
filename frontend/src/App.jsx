import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddQuiz from "./pages/AddQuiz";
import TakeQuiz from "./pages/TakeQuiz";
import MyScore from "./pages/MyScore";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [userRole, setUserRole] = useState("");
  const [username, setUsername] = useState("");

  return (
    <>
      <Navbar
        userRole={userRole}
        username={username}
        setUserRole={setUserRole}
        setUsername={setUsername}
      />

      <Routes>
        <Route path="/" element={<Login setUserRole={setUserRole} setUsername={setUsername} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/:role" element={<Dashboard />} />

        {/* Instructor/Admin route */}
        <Route
          path="/add-quiz"
          element={
            <ProtectedRoute userRole={userRole} allowedRoles={["instructor", "admin"]}>
              <AddQuiz role={userRole} />
            </ProtectedRoute>
          }
        />

        {/* Student routes */}
        <Route
          path="/take-quiz"
          element={
            <ProtectedRoute userRole={userRole} allowedRoles={["student"]}>
              <TakeQuiz studentUsername={username} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-score"
          element={
            <ProtectedRoute userRole={userRole} allowedRoles={["student"]}>
              <MyScore studentUsername={username} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute userRole={userRole} allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

export default App;
