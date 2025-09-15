import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css"; // reuse CSS

const QuizStats = ({ onBack }) => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/quiz/stats")
      .then((res) => setStats(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading stats...</p>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Quiz Statistics</h2>
        {stats.length === 0 ? (
          <p>No stats available.</p>
        ) : (
          <table className="score-table">
            <thead>
              <tr>
                <th>Quiz ID</th>
                <th>Highest Score</th>
                <th>Average Score</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((s) => (
                <tr key={s.quizId}>
                  <td>{s.quizId}</td>
                  <td>{s.maxScore}</td>
                  <td>{parseFloat(s.avgScore).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {onBack && <button className="back-button" onClick={onBack}>Back</button>}
      </div>
    </div>
  );
};

export default QuizStats;
