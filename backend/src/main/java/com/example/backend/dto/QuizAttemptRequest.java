package com.example.backend.dto;

import java.util.Map;

public class QuizAttemptRequest {
    private Long quizId;
    private String studentUsername;
    private Map<Long, String> answers; // questionId -> selected option (A/B/C/D)

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public String getStudentUsername() {
        return studentUsername;
    }

    public void setStudentUsername(String studentUsername) {
        this.studentUsername = studentUsername;
    }

    public Map<Long, String> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<Long, String> answers) {
        this.answers = answers;
    }
}
