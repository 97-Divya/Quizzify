import React, { useEffect, useState } from "react";
import axios from "axios";

const MyScore = ({ onBack }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/user/${username}/attempts`)
      .then((res) => setScores(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [username]);

  if (!username) {
    return (
      <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
        <h3>Please login first to view your scores.</h3>
        {onBack && <button onClick={onBack} style={{ marginTop: "20px" }}>Back</button>}
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>My Scores</h2>
      {scores.length === 0 ? (
        <p>No quiz attempts found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Quiz</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Score</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s) => (
              <tr key={s.quizId}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{s.quizTitle}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{s.score}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{s.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {onBack && <button onClick={onBack} style={{ marginTop: "20px" }}>Back</button>}
    </div>
  );
};

export default MyScore;
