import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import QuizDetails from "./pages/QuizDetails";
import ViewQuiz from "./pages/ViewQuiz";

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
  path="/quiz/:quizId/view"
  element={
    <ProtectedRoute userRole={userRole} allowedRoles={["instructor","admin","student"]}>
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
    <ProtectedRoute userRole={userRole} allowedRoles={["instructor","admin"]}>
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
<Route path="/my-score" element={
  <ProtectedRoute userRole={userRole} allowedRoles={["student"]}>
    <MyScore studentUsername={username} />
  </ProtectedRoute>
} />
<Route path="/quiz/:quizId/view" element={<ViewQuiz />} />

      </Routes>
    </>
  );
}

export default App;
