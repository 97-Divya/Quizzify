import React, { useEffect, useState } from "react";
import axios from "axios";

const MyScore = ({ studentUsername }) => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!studentUsername) return;

  setLoading(true);
  axios
    .get(`http://localhost:8080/api/user/${studentUsername}/attempts`)
    .then((res) => setAttempts(res.data || []))
    .catch((err) => {
      console.error(err);
      setAttempts([]);
    })
    .finally(() => setLoading(false));
}, [studentUsername]);

  if (!studentUsername) {
    return <p>Please login first to view your scores.</p>;
  }

  if (loading) {
    return <p>Loading your scores...</p>;
  }

  if (attempts.length === 0) {
    return <p>No quiz attempts found.</p>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "10px" }}>
      <h2>My Quiz Scores</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
              Quiz Title
            </th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
              Score
            </th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
              Total Questions
            </th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((attempt) => (
            <tr key={attempt.quizId}>
              <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                  {attempt.title || attempt.quizTitle || "Unknown Quiz"}
              </td>
              <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                {attempt.score}
              </td>
              <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                {attempt.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyScore;
