package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StudentAttemptDto {
    private Long quizId;
    private String quizTitle;
    private int score;
    private int total;

    public StudentAttemptDto(Long quizId, String quizTitle, int score, int total) {
        this.quizId = quizId;
        this.quizTitle = quizTitle;
        this.score = score;
        this.total = total;
    }

    public Long getQuizId() { return quizId; }
    public String getQuizTitle() { return quizTitle; }
    public int getScore() { return score; }
    public int getTotal() { return total; }

    // Provide "title" JSON property too (alias) so frontend can use attempt.title
    @JsonProperty("title")
    public String getTitle() {
        return this.quizTitle;
    }
}
