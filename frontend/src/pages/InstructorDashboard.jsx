import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const InstructorDashboard = ({ username }) => {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [myQuizzes, setMyQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // All quizzes
    axios
      .get("http://localhost:8080/api/quiz/all")
      .then((res) => setAllQuizzes(res.data || []))
      .catch((err) => { console.error("Failed to load all quizzes", err); setAllQuizzes([]); });

    // My quizzes
    if (username) {
      axios
        .get(`http://localhost:8080/api/quiz/instructor/${encodeURIComponent(username)}/quizzes`)
        .then((res) => setMyQuizzes(res.data || []))
        .catch((err) => { console.error("Failed to load my quizzes", err); setMyQuizzes([]); });
    }
  }, [username]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">Instructor Dashboard</Typography>

      <Box sx={{ mb: 3 }}>
        <Button variant="contained" color="primary" onClick={() => navigate("/add-quiz")}>
          Add New Quiz
        </Button>
      </Box>

      {/* All Quizzes - view only (no edit) */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>All Quizzes</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {allQuizzes.map((quiz) => (
              <Card key={quiz.id} sx={{ p: 2, minWidth: 220 }}>
                <Typography sx={{ mb: 1 }}>{quiz.title}</Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button size="small" variant="outlined" onClick={() => navigate(`/quiz/${quiz.id}/view`)}>
                    View Quiz
                  </Button>
                  <Button size="small" variant="outlined" onClick={() => navigate(`/quiz/${quiz.id}/attempts`)}>
                    View Scores
                  </Button>
                </Box>
              </Card>
            ))}
            {allQuizzes.length === 0 && <Typography>No quizzes available.</Typography>}
          </Box>
        </CardContent>
      </Card>

      {/* My Quizzes - edit + view + view scores */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>My Quizzes</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {myQuizzes.map((quiz) => (
              <Card key={quiz.id} sx={{ p: 2, minWidth: 220 }}>
                <Typography sx={{ mb: 1 }}>{quiz.title}</Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button size="small" variant="outlined" onClick={() => navigate(`/quiz/${quiz.id}/view`)}>
                    View Quiz
                  </Button>
                  <Button size="small" variant="outlined" onClick={() => navigate(`/quiz/${quiz.id}/attempts`)}>
                    View Scores
                  </Button>
                  <Button size="small" variant="contained" onClick={() => navigate(`/update-quiz/${quiz.id}`)}>
                    Edit
                  </Button>
                </Box>
              </Card>
            ))}
            {myQuizzes.length === 0 && <Typography>You haven't created any quizzes yet.</Typography>}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InstructorDashboard;
