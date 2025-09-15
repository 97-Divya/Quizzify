import React, { useState, useEffect } from "react";
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
import QuizStats from "./pages/QuizStats";
import InstructorDashboard from "./pages/InstructorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import StudentAttempts from "./pages/StudentAttempts";
import ProtectedRoute from "./components/ProtectedRoute";
import ViewQuiz from "./pages/ViewQuiz";

function App() {
  const [userRole, setUserRole] = useState("");
  const [username, setUsername] = useState("");

  // Sync state with localStorage on mount
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");
    if (storedRole) setUserRole(storedRole);
    if (storedUsername) setUsername(storedUsername);
  }, []);

  // Update localStorage whenever userRole or username changes
  useEffect(() => {
    if (userRole) localStorage.setItem("role", userRole);
    else localStorage.removeItem("role");

    if (username) localStorage.setItem("username", username);
    else localStorage.removeItem("username");
  }, [userRole, username]);

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

        {/* General Dashboard */}
        <Route
          path="/dashboard/:role"
          element={
            <ProtectedRoute
              userRole={userRole}
              allowedRoles={["student", "instructor", "admin"]}
            >
              <Dashboard userRole={userRole} username={username} />
            </ProtectedRoute>
          }
        />

        {/* Student Dashboard */}
        <Route
          path="/dashboard/student"
          element={
            <ProtectedRoute userRole={userRole} allowedRoles={["student"]}>
              <StudentDashboard />
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
          path="/quiz/:quizId/view"
          element={
            <ProtectedRoute
              userRole={userRole}
              allowedRoles={["instructor", "admin", "student"]}
            >
              <ViewQuiz />
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
        <Route
          path="/quiz/:quizId/attempts"
          element={
            <ProtectedRoute userRole={userRole} allowedRoles={["instructor", "admin"]}>
              <StudentAttempts />
            </ProtectedRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/take-quiz"
          element={
            <ProtectedRoute userRole={userRole} allowedRoles={["student"]}>
              <TakeQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-score"
          element={
            <ProtectedRoute userRole={userRole} allowedRoles={["student"]}>
              <MyScore />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz-stats"
          element={
            <ProtectedRoute userRole={userRole} allowedRoles={["student"]}>
              <QuizStats />
            </ProtectedRoute>
          }
        />

        {/* Catch-all fallback */}
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </>
  );
}

export default App;
