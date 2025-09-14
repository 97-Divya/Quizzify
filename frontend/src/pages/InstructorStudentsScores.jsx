import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import axios from "axios";

const InstructorStudentsScores = ({ username }) => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all quizzes created by this instructor
    axios.get("http://localhost:8080/api/quiz/all")
      .then(res => {
        const myQuizzes = res.data.filter(q => q.createdByUsername === username);
        const quizIds = myQuizzes.map(q => q.id);

        // Fetch attempts for each quiz
        Promise.all(quizIds.map(id =>
          axios.get(`http://localhost:8080/api/quiz/attempts/${id}`).then(r => r.data)
        ))
        .then(results => {
          // Flatten array of arrays
          const allAttempts = results.flat();
          setAttempts(allAttempts);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
      })
      .catch(err => console.error(err));
  }, [username]);

  if (loading) return <Typography>Loading...</Typography>;
  if (attempts.length === 0) return <Typography>No students have attempted your quizzes yet.</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" mb={4} align="center">Students & Scores</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Quiz Title</TableCell>
            <TableCell>Student Username</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Total Questions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attempts.map((a, idx) => (
            <TableRow key={idx}>
              <TableCell>{a.quizTitle}</TableCell>
              <TableCell>{a.studentUsername}</TableCell>
              <TableCell>{a.score}</TableCell>
              <TableCell>{a.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default InstructorStudentsScores;
