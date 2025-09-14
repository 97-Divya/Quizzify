import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm">
          <Paper sx={{ mt: 8, p: 4 }}>
            <Typography color="error" variant="h6">
              Something went wrong while loading the quiz.
            </Typography>
          </Paper>
        </Container>
      );
    }
    return this.props.children;
  }
}

const TakeQuizContent = ({ studentUsername }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  if (!studentUsername) {
    return (
      <Container maxWidth="sm">
        <Paper sx={{ mt: 8, p: 4 }}>
          <Typography>Please login first to take a quiz.</Typography>
        </Paper>
      </Container>
    );
  }

  // Load all quizzes
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/quiz/all")
      .then((res) => setQuizzes(res.data || []))
      .catch((err) => {
        console.error(err);
        setQuizzes([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Load questions when a quiz is selected
  useEffect(() => {
    if (!selectedQuizId) return;
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/quiz/questions/${selectedQuizId}`)
      .then((res) => {
        setQuestions(res.data || []);
        setCurrentIndex(0);
        setAnswers({});
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedQuizId]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => setCurrentIndex((prev) => prev + 1);

const handleSubmit = async () => {
  if (!questions.length) return;

  try {
    const payload = {
      quizId: selectedQuizId,
      studentUsername,
      answers, // { questionId: "A" }
    };

    await axios.post("http://localhost:8080/api/user/attempt", payload);

    // Show a simple alert and redirect to MyScore
    alert("Quiz submitted successfully!");
    navigate("/my-score"); // Make sure this route renders MyScore component
  } catch (err) {
    console.error(err);
    alert("Failed to submit quiz");
  }
};

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Paper sx={{ mt: 8, p: 4, textAlign: "center" }}>
          <CircularProgress />
          <Typography mt={2}>Loading...</Typography>
        </Paper>
      </Container>
    );
  }

  // Quiz selection screen
  if (!selectedQuizId) {
    return (
      <Container maxWidth="sm">
        <Paper sx={{ mt: 8, p: 4 }}>
          <Typography variant="h5" mb={2}>
            Select a Quiz
          </Typography>
          {quizzes.length === 0 ? (
            <Typography>No quizzes available.</Typography>
          ) : (
            quizzes.map((q) => (
              <Button
                key={q.id}
                variant="outlined"
                fullWidth
                sx={{ mb: 1 }}
                onClick={() => setSelectedQuizId(q.id)}
              >
                {q.title}
              </Button>
            ))
          )}
        </Paper>
      </Container>
    );
  }

  const currentQuestion = questions?.[currentIndex];
  if (!currentQuestion) return null;

  return (
    <Container maxWidth="sm">
      <Paper sx={{ mt: 8, p: 4 }}>
        <Typography variant="h6" mb={2}>
          Question {currentIndex + 1} of {questions.length}
        </Typography>
        <Typography mb={2}>{currentQuestion.questionText}</Typography>

        <RadioGroup
          value={answers[currentQuestion.id] || ""}
          onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
        >
          <FormControlLabel value="A" control={<Radio />} label={currentQuestion.optionA} />
          <FormControlLabel value="B" control={<Radio />} label={currentQuestion.optionB} />
          <FormControlLabel value="C" control={<Radio />} label={currentQuestion.optionC} />
          <FormControlLabel value="D" control={<Radio />} label={currentQuestion.optionD} />
        </RadioGroup>

        <Box mt={2} display="flex" justifyContent="space-between">
          {currentIndex < questions.length - 1 ? (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          )}
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setSelectedQuizId(null)}
          >
            Back to Quiz List
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

const TakeQuiz = (props) => (
  <ErrorBoundary>
    <TakeQuizContent {...props} />
  </ErrorBoundary>
);

export default TakeQuiz;
