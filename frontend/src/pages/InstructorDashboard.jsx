import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Paper, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const InstructorDashboard = ({ username }) => {
  const [myQuizzes, setMyQuizzes] = useState([]);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const navigate = useNavigate();

  // Fetch quizzes created by this instructor
  const fetchMyQuizzes = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/quiz/instructor/${username}/quizzes`);
      setMyQuizzes(res.data);
    } catch (err) {
      console.error(err);
      setMyQuizzes([]);
    }
  };

  // Fetch all quizzes
  const fetchAllQuizzes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/quiz/all");
      setAllQuizzes(res.data);
    } catch (err) {
      console.error(err);
      setAllQuizzes([]);
    }
  };

  useEffect(() => {
    fetchMyQuizzes();
    fetchAllQuizzes();
  }, [username]);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" mb={3}>Instructor Dashboard</Typography>

      {/* Add Quiz Button */}
      <Button variant="contained" color="primary" onClick={() => navigate("/add-quiz")}>
        Create New Quiz
      </Button>

      <Typography variant="h5" mt={4} mb={2}>My Quizzes</Typography>
      {myQuizzes.length === 0 ? (
        <Typography>No quizzes created yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {myQuizzes.map((quiz) => (
            <Grid item xs={12} md={6} key={quiz.id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">{quiz.title}</Typography>
                <Button
                  variant="outlined"
                  sx={{ mr: 1, mt: 1 }}
                  onClick={() => navigate(`/update-quiz/${quiz.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  sx={{ mt: 1 }}
                  onClick={() => navigate(`/student-attempts/${quiz.id}`)}
                >
                  View Students/Scores
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Typography variant="h5" mt={4} mb={2}>All Quizzes</Typography>
      {allQuizzes.length === 0 ? (
        <Typography>No quizzes available.</Typography>
      ) : (
        <Grid container spacing={2}>
          {allQuizzes.map((quiz) => (
            <Grid item xs={12} md={6} key={quiz.id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">{quiz.title}</Typography>
                {/* Show edit button only if instructor created this quiz */}
                {quiz.createdByUsername === username && (
                  <Button
                    variant="outlined"
                    sx={{ mr: 1, mt: 1 }}
                    onClick={() => navigate(`/update-quiz/${quiz.id}`)}
                  >
                    Edit
                  </Button>
                )}
                <Button
                  variant="outlined"
                  sx={{ mt: 1 }}
                  onClick={() => navigate(`/student-attempts/${quiz.id}`)}
                >
                  View Students/Scores
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default InstructorDashboard;
