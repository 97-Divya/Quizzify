import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import axios from "axios";

const StudentAttempts = () => {
  const { quizId } = useParams();
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/quiz/attempts/${quizId}`)
      .then(res => setAttempts(res.data))
      .catch(err => console.error(err));
  }, [quizId]);

  return (
    <Container maxWidth="md">
      <Paper sx={{ mt: 8, p: 4 }}>
        <Typography variant="h4" mb={3} align="center">Students' Scores</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Username</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Quiz Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attempts.map((a, idx) => (
              <TableRow key={idx}>
                <TableCell>{a.studentUsername}</TableCell>
                <TableCell>{a.score}</TableCell>
                <TableCell>{a.total}</TableCell>
                <TableCell>{a.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default StudentAttempts;
