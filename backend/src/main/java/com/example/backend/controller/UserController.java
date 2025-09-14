package com.example.backend.controller;

import com.example.backend.Entity.Attempt;
import com.example.backend.Entity.Quiz;
import com.example.backend.Entity.User;
import com.example.backend.Repository.AttemptRepository;
import com.example.backend.Repository.QuizRepository;
import com.example.backend.Repository.UserRepository;
import com.example.backend.dto.QuizAttemptRequest;
import com.example.backend.dto.StudentAttemptDto;
import com.example.backend.dto.StudentStatsDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173") // allow frontend calls
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AttemptRepository attemptRepository;

    @Autowired
    private QuizRepository quizRepository;

    // --------------------- AUTH -----------------------
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(userRepository.save(user));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(existingUser.get().getRole());
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    // --------------------- QUIZ ATTEMPT -----------------------
    @PostMapping("/attempt")
    public ResponseEntity<?> attemptQuiz(@RequestBody QuizAttemptRequest attemptRequest) {

        Quiz quiz = quizRepository.findById(attemptRequest.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        if (quiz.getQuestions() == null || quiz.getQuestions().isEmpty()) {
            return ResponseEntity.badRequest().body("Quiz has no questions");
        }

        int score = 0;
        for (var q : quiz.getQuestions()) {
            String userAnswer = attemptRequest.getAnswers().get(q.getId());
            if (userAnswer != null && userAnswer.equalsIgnoreCase(q.getCorrectAnswer())) {
                score++;
            }
        }

        Attempt attempt = new Attempt();
        attempt.setQuizId(quiz.getId());
        attempt.setStudentUsername(attemptRequest.getStudentUsername());
        attempt.setScore(score);
        attempt.setTotal(quiz.getQuestions().size());

        attemptRepository.save(attempt);

        return ResponseEntity.ok(Map.of(
                "quizId", quiz.getId(),
                "score", score,
                "totalQuestions", quiz.getQuestions().size()
        ));
    }

    // --------------------- STUDENT STATS -----------------------
    @GetMapping("/{username}/stats")
    public ResponseEntity<StudentStatsDto> getStudentStats(@PathVariable String username) {
        Object[] stats = attemptRepository.findStudentStats(username);

        if (stats == null || stats.length < 4) {
            return ResponseEntity.ok(new StudentStatsDto(0, 0, 0, 0));
        }

        long quizzesTaken = (long) stats[0];
        Double avgScore = (Double) stats[1];
        Integer highest = (Integer) stats[2];
        Integer lowest = (Integer) stats[3];

        StudentStatsDto dto = new StudentStatsDto(
                quizzesTaken,
                avgScore != null ? avgScore : 0.0,
                highest != null ? highest : 0,
                lowest != null ? lowest : 0
        );

        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{username}/attempts")
    public ResponseEntity<List<StudentAttemptDto>> getStudentAttempts(@PathVariable String username) {
        List<Attempt> attempts = attemptRepository.findByStudentUsername(username);

        List<StudentAttemptDto> dtoList = attempts.stream()
                .map(a -> {
                    String title = quizRepository.findById(a.getQuizId())
                            .map(Quiz::getTitle)
                            .orElse("Unknown Quiz");
                    return new StudentAttemptDto(a.getQuizId(), title, a.getScore(), a.getTotal());
                })
                .toList();

        return ResponseEntity.ok(dtoList);
    }
}
