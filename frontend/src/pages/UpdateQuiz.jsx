import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Paper, Typography, TextField, Button, Grid, IconButton, Box } from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import axios from "axios";

const UpdateQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/quiz/questions/${quizId}`)
      .then((res) => {
        setQuestions(res.data.map(q => ({
          id: q.id,
          questionText: q.questionText,
          optionA: q.optionA,
          optionB: q.optionB,
          optionC: q.optionC,
          optionD: q.optionD,
          correctAnswer: q.correctAnswer
        })));
        return axios.get(`http://localhost:8080/api/quiz/all`);
      })
      .then(res => {
        const quiz = res.data.find(q => q.id === parseInt(quizId));
        setTitle(quiz.title);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [quizId]);

  const handleAddQuestion = () => setQuestions([...questions, { questionText: "", optionA: "", optionB: "", optionC: "", optionD: "", correctAnswer: "" }]);
  const handleRemoveQuestion = (i) => setQuestions(questions.filter((_, idx) => idx !== i));
  const handleChange = (i, field, val) => {
    const q = [...questions];
    q[i][field] = val;
    setQuestions(q);
  };

  const handleUpdate = () => {
    if (!title) return alert("Title required");
    for (let q of questions) if (!q.questionText || !q.optionA || !q.optionB || !q.optionC || !q.optionD || !q.correctAnswer) return alert("All fields required");

    axios.put(`http://localhost:8080/api/quiz/update/${quizId}`, { title, questions })
      .then(() => {
        alert("Quiz updated!");
        navigate("/dashboard/instructor");
      })
      .catch(err => console.error(err));
  };

  if (loading) return <p>Loading quiz...</p>;

  return (
    <Container maxWidth="md">
      <Paper sx={{ mt: 8, p: 4 }}>
        <Typography variant="h4" mb={3} align="center">Update Quiz</Typography>

        <TextField label="Quiz Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 3 }} />

        {questions.map((q, idx) => (
          <Paper key={idx} sx={{ p: 2, mb: 2, position: "relative" }}>
            <IconButton sx={{ position: "absolute", top: 8, right: 8 }} onClick={() => handleRemoveQuestion(idx)} disabled={questions.length === 1}><RemoveCircle /></IconButton>
            <Typography variant="h6" mb={2}>Question {idx + 1}</Typography>
            <TextField label="Question Text" fullWidth value={q.questionText} onChange={(e) => handleChange(idx, "questionText", e.target.value)} sx={{ mb: 2 }} />
            <Grid container spacing={2} mb={2}>
              <Grid item xs={6}><TextField label="Option A" fullWidth value={q.optionA} onChange={(e) => handleChange(idx, "optionA", e.target.value)} /></Grid>
              <Grid item xs={6}><TextField label="Option B" fullWidth value={q.optionB} onChange={(e) => handleChange(idx, "optionB", e.target.value)} /></Grid>
              <Grid item xs={6}><TextField label="Option C" fullWidth value={q.optionC} onChange={(e) => handleChange(idx, "optionC", e.target.value)} /></Grid>
              <Grid item xs={6}><TextField label="Option D" fullWidth value={q.optionD} onChange={(e) => handleChange(idx, "optionD", e.target.value)} /></Grid>
            </Grid>
            <TextField label="Correct Answer (A/B/C/D)" fullWidth value={q.correctAnswer} onChange={(e) => handleChange(idx, "correctAnswer", e.target.value.toUpperCase())} />
          </Paper>
        ))}

        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button variant="outlined" startIcon={<AddCircle />} onClick={handleAddQuestion}>Add Question</Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>Update Quiz</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UpdateQuiz;
