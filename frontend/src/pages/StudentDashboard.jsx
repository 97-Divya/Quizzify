import React from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
      <h2>Student Dashboard</h2>
      <p>Welcome! Choose an option below:</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "30px" }}>
        <button
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
          onClick={() => navigate("/take-quiz")}
        >
          Attempt Quiz
        </button>
        <button
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
          onClick={() => navigate("/my-score")}
        >
          My Score
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
