import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, List, ListItem } from "@mui/material";
import axios from "axios";

const MyScore = ({ studentUsername }) => {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/quiz/attempts/${studentUsername}`)
      .then(res => setAttempts(res.data));
  }, [studentUsername]);

  return (
    <Container maxWidth="sm">
      <Paper sx={{ mt: 8, p: 4 }}>
        <Typography variant="h5" mb={2}>My Scores</Typography>
        <List>
          {attempts.map(a => (
            <ListItem key={a.id}>
              {a.quiz.title}: {a.score}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default MyScore;
