import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = ({ userRole }) => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/quiz/all")
      .then(res => setQuizzes(res.data || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", textAlign: "center" }}>
      <h2>{userRole === "student" ? "Available Quizzes" : "All Quizzes"}</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        quizzes.map(q => (
          <div key={q.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{q.title}</span>
            {userRole === "student" && (
              <button onClick={() => navigate("/take-quiz")} style={{ padding: "5px 10px", cursor: "pointer" }}>
                Take Quiz
              </button>
            )}
            {(userRole === "instructor" || userRole === "admin") && (
              <button onClick={() => navigate(`/update-quiz/${q.id}`)} style={{ padding: "5px 10px", cursor: "pointer" }}>
                Edit Quiz
              </button>
            )}
          </div>
        ))
      )}
      {(userRole === "instructor" || userRole === "admin") && (
        <button onClick={() => navigate("/add-quiz")} style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>
          Add Quiz
        </button>
      )}
    </div>
  );
};

export default Dashboard;
