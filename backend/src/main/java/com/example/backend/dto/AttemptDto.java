package com.example.backend.dto;

public class AttemptDto {
    private String studentUsername;
    private int score;
    private int total;
    private String quizTitle;

    // Constructor
    public AttemptDto(String studentUsername, int score, int total, String quizTitle) {
        this.studentUsername = studentUsername;
        this.score = score;
        this.total = total;
        this.quizTitle = quizTitle;
    }

    // Getters and setters
    public String getStudentUsername() { return studentUsername; }
    public void setStudentUsername(String studentUsername) { this.studentUsername = studentUsername; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public int getTotal() { return total; }
    public void setTotal(int total) { this.total = total; }

    public String getQuizTitle() { return quizTitle; }
    public void setQuizTitle(String quizTitle) { this.quizTitle = quizTitle; }
}
