import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";

const StudentAttempts = () => {
  const { quizId } = useParams();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/api/quiz/${quizId}/attempts`)
      .then((res) => setAttempts(res.data || []))
      .catch((err) => { console.error("Failed to load attempts", err); setAttempts([]); })
      .finally(() => setLoading(false));
  }, [quizId]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Quiz Attempts (Quiz {quizId})</Typography>

      <Paper sx={{ p: 2 }}>
        {loading ? (
          <Typography>Loading attempts...</Typography>
        ) : attempts.length === 0 ? (
          <Typography>No attempts yet.</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Username</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attempts.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{a.studentUsername}</TableCell>
                  <TableCell>{a.score}</TableCell>
                  <TableCell>{a.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
};

export default StudentAttempts;
