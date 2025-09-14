import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const QuizDetails = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    // get quiz title (from /api/quiz/all and find — or you can add dedicated endpoint)
    axios.get("http://localhost:8080/api/quiz/all")
      .then(res => {
        const quiz = (res.data || []).find(q => String(q.id) === String(quizId));
        if (quiz) setTitle(quiz.title || "");
      })
      .catch(() => {});

    // get questions
    axios.get(`http://localhost:8080/api/quiz/questions/${quizId}`)
      .then(res => setQuestions(res.data || []))
      .catch(err => { console.error(err); setQuestions([]); });

    // get attempts for this quiz
    axios.get(`http://localhost:8080/api/quiz/attempts/${quizId}`)
      .then(res => setAttempts(res.data || []))
      .catch(err => { console.error(err); setAttempts([]); });
  }, [quizId]);

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" mb={2}>Quiz Details</Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">{title || `Quiz #${quizId}`}</Typography>

        <Typography variant="subtitle1" mt={2}>Questions (with correct answers)</Typography>
        {questions.length === 0 ? (
          <div>No questions found.</div>
        ) : (
          questions.map((q, idx) => (
            <Paper key={q.id} sx={{ p: 2, my: 1 }}>
              <div><strong>Q{idx + 1}:</strong> {q.questionText}</div>
              <ul>
                <li>A: {q.optionA}</li>
                <li>B: {q.optionB}</li>
                <li>C: {q.optionC}</li>
                <li>D: {q.optionD}</li>
              </ul>
              <div><em>Correct answer:</em> {q.correctAnswer}</div>
            </Paper>
          ))
        )}
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={1}>Student Attempts & Scores</Typography>
        {attempts.length === 0 ? (
          <div>No attempts yet.</div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attempts.map((a, i) => (
                <TableRow key={i}>
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

export default QuizDetails;
