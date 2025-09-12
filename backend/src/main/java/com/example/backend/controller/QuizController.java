package com.example.backend.controller;

import com.example.backend.Entity.Quiz;
import com.example.backend.Entity.Question;
import com.example.backend.Repository.QuizRepository;
import com.example.backend.Repository.QuestionRepository;
import com.example.backend.dto.QuizAttemptRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "http://localhost:5173")
public class QuizController {

    @Autowired private QuizRepository quizRepository;
    @Autowired private QuestionRepository questionRepository;

    // Add quiz with questions
    @PostMapping("/add-with-questions")
    public ResponseEntity<Quiz> addQuizWithQuestions(@RequestBody Quiz quiz) {
        if (quiz.getQuestions() != null) {
            quiz.getQuestions().forEach(q -> q.setQuiz(quiz));
        }
        Quiz savedQuiz = quizRepository.save(quiz);
        return ResponseEntity.ok(savedQuiz);
    }

    // Update quiz
    @PutMapping("/update/{quizId}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable Long quizId, @RequestBody Quiz updatedQuiz) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        quiz.setTitle(updatedQuiz.getTitle());
        quiz.setCreatedByRole(updatedQuiz.getCreatedByRole());

        // Remove old questions
        questionRepository.deleteAll(quiz.getQuestions());

        // Add updated questions
        if (updatedQuiz.getQuestions() != null) {
            updatedQuiz.getQuestions().forEach(q -> q.setQuiz(quiz));
            quiz.setQuestions(updatedQuiz.getQuestions());
        }

        Quiz savedQuiz = quizRepository.save(quiz);
        return ResponseEntity.ok(savedQuiz);
    }

    // Get all quizzes
    @GetMapping("/all")
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    // Get questions for a quiz
    @GetMapping("/questions/{quizId}")
    public List<Question> getQuestions(@PathVariable Long quizId) {
        return questionRepository.findByQuizId(quizId);
    }

    // Attempt quiz (calculate score)
    @PostMapping("/attempt")
    public ResponseEntity<?> attemptQuiz(@RequestBody QuizAttemptRequest attempt) {
        Quiz quiz = quizRepository.findById(attempt.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        List<Question> questions = questionRepository.findByQuizId(attempt.getQuizId());

        int score = 0;
        for (Question q : questions) {
            String userAnswer = attempt.getAnswers().get(q.getId());
            if (userAnswer != null && userAnswer.equalsIgnoreCase(q.getCorrectAnswer())) {
                score++;
            }
        }

        return ResponseEntity.ok(
                Map.of(
                        "quizId", attempt.getQuizId(),
                        "totalQuestions", questions.size(),
                        "score", score,
                        "studentUsername", attempt.getStudentUsername()
                )
        );
    }
}
