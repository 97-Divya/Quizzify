import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddQuiz from "./pages/AddQuiz";
import UpdateQuiz from "./pages/UpdateQuiz";
import TakeQuiz from "./pages/TakeQuiz";
import MyScore from "./pages/MyScore";
import InstructorDashboard from "./pages/InstructorDashboard";
import StudentAttempts from "./pages/StudentAttempts";
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
        {/* Public Routes */}
        <Route
          path="/"
          element={<Login setUserRole={setUserRole} setUsername={setUsername} />}
        />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route
          path="/dashboard/:role"
          element={
            <ProtectedRoute userRole={userRole} allowedRoles={["student", "instructor", "admin"]}>
              <Dashboard userRole={userRole} username={username} />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute userRole={userRole} allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-quiz"
          element={
            <ProtectedRoute userRole={userRole} allowedRoles={["admin", "instructor"]}>
              <AddQuiz role={userRole} username={username} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-quiz/:quizId"
          element={
            <ProtectedRoute userRole={userRole} allowedRoles={["instructor"]}>
              <UpdateQuiz />
            </ProtectedRoute>
          }
        />

        {/* Instructor Routes */}
        <Route
          path="/dashboard/instructor"
          element={
            <ProtectedRoute userRole={userRole} allowedRoles={["instructor"]}>
              <InstructorDashboard username={username} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-attempts/:quizId"
          element={
            <ProtectedRoute userRole={userRole} allowedRoles={["instructor"]}>
              <StudentAttempts />
            </ProtectedRoute>
          }
        />

        {/* Student Routes */}
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
      </Routes>
    </>
  );
}

export default App;
