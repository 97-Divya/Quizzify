import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const ViewQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/quiz/${quizId}/full`)
      .then((res) => setQuiz(res.data))
      .catch((err) => console.error("Error fetching quiz:", err));

    axios
      .get(`http://localhost:8080/api/quiz/${quizId}/attempts`)
      .then((res) => setAttempts(res.data))
      .catch((err) => console.error("Error fetching attempts:", err));
  }, [quizId]);

  if (!quiz) {
    return <Typography>Loading quiz...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {quiz.title}
      </Typography>

      {/* Questions */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Questions
          </Typography>
          <List>
            {quiz.questions.map((q, idx) => (
              <React.Fragment key={q.id}>
                <ListItem>
                  <ListItemText
                    primary={`${idx + 1}. ${q.questionText}`}
                    secondary={`Correct Answer: ${q.correctAnswer}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Attempts */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Student Attempts
          </Typography>
          {attempts.length === 0 ? (
            <Typography>No attempts yet</Typography>
          ) : (
            <List>
              {attempts.map((a, idx) => (
                <React.Fragment key={idx}>
                  <ListItem>
                    <ListItemText
                      primary={`Quiz: ${a.quizTitle}`}
                      secondary={`Score: ${a.score} / ${a.total}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ViewQuiz;
