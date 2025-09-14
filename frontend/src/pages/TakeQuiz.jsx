import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css"; // Reuse CSS for card styling

const TakeQuiz = ({ onBack }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  const studentUsername = localStorage.getItem("username");

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8080/api/quiz/all")
      .then((res) => setQuizzes(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedQuiz) return;
    setLoading(true);
    axios.get(`http://localhost:8080/api/quiz/questions/${selectedQuiz.id}`)
      .then((res) => {
        setQuestions(res.data || []);
        setCurrentIndex(0);
        setAnswers({});
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedQuiz]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => setCurrentIndex((prev) => prev + 1);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8080/api/user/attempt", {
        quizId: selectedQuiz.id,
        studentUsername,
        answers,
      });
      alert("Quiz submitted successfully!");
      setSelectedQuiz(null);
      setQuestions([]);
      setAnswers({});
      if (onBack) onBack();
    } catch (err) {
      console.error(err);
      alert("Failed to submit quiz");
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  // Quiz selection view
  if (!selectedQuiz) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h3 className="dashboard-title">Select a Quiz</h3>
          {quizzes.length === 0 ? (
            <p>No quizzes available.</p>
          ) : (
            quizzes.map((q) => (
              <button
                key={q.id}
                className="quiz-select-button"
                onClick={() => setSelectedQuiz(q)}
              >
                {q.title}
              </button>
            ))
          )}
          <button className="back-button" onClick={onBack}>Back</button>
        </div>
      </div>
    );
  }

  // Current question view
  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) return <p style={{ textAlign: "center", marginTop: "50px" }}>Quiz completed!</p>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h4 className="dashboard-title">
          Question {currentIndex + 1} of {questions.length}
        </h4>
        <p className="question-text">{currentQuestion.questionText}</p>

        <div className="options-container">
          {["A", "B", "C", "D"].map((opt) => (
            <div
              key={opt}
              className={`option-box ${answers[currentQuestion.id] === opt ? "selected-option" : ""}`}
              onClick={() => handleAnswerChange(currentQuestion.id, opt)}
            >
              {currentQuestion[`option${opt}`]}
            </div>
          ))}
        </div>

        <div className="quiz-actions">
          {currentIndex < questions.length - 1 ? (
            <button className="submit-button" onClick={handleNext}>Next</button>
          ) : (
            <button className="submit-button" onClick={handleSubmit}>Submit Quiz</button>
          )}
        </div>
      </div>

      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
};

export default TakeQuiz;
