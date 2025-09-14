import React, { useEffect, useState } from "react";
import axios from "axios";

const MyScore = ({ studentUsername }) => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentUsername) return;

    setLoading(true);
    axios
      .get(`http://localhost:8080/api/user/${encodeURIComponent(studentUsername)}/attempts`)
      .then((res) => setAttempts(res.data || []))
      .catch((err) => {
        console.error("Failed to fetch attempts:", err);
        setAttempts([]);
      })
      .finally(() => setLoading(false));
  }, [studentUsername]);

  if (!studentUsername) return <p>Please login to view your scores.</p>;
  if (loading) return <p>Loading your scores...</p>;
  if (!attempts || attempts.length === 0) return <p>No quiz attempts found.</p>;

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: 16 }}>
      <h2>My Quiz Scores</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ddd", padding: 8, textAlign: "left" }}>Quiz Title</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: 8, textAlign: "left" }}>Score</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: 8, textAlign: "left" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((a, i) => (
            <tr key={i}>
              <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{a.title || a.quizTitle}</td>
              <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{a.score}</td>
              <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{a.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyScore;
