import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = ({ userRole }) => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/quiz/all")
      .then(res => setQuizzes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3}>Quizzes</Typography>

      {quizzes.map(q => (
        <Paper key={q.id} sx={{ p: 2, mb: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography>{q.title}</Typography>

            {userRole === "student" && (
              <Button variant="outlined" onClick={() => navigate("/take-quiz")}>Take Quiz</Button>
            )}

            {(userRole === "instructor" || userRole === "admin") && (
              <>
                <Button variant="outlined" onClick={() => navigate(`/update-quiz/${q.id}`)}>Edit</Button>
              </>
            )}
          </Box>
        </Paper>
      ))}

      {(userRole === "instructor" || userRole === "admin") && (
        <Button variant="contained" color="primary" onClick={() => navigate("/add-quiz")}>Add Quiz</Button>
      )}
    </Container>
  );
};

export default Dashboard;
