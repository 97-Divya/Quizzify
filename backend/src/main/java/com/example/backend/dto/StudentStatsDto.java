package com.example.backend.dto;

public class StudentStatsDto {
    private long quizzesTaken;
    private double averageScore;
    private int highestScore;
    private int lowestScore;

    public StudentStatsDto(long quizzesTaken, double averageScore, int highestScore, int lowestScore) {
        this.quizzesTaken = quizzesTaken;
        this.averageScore = averageScore;
        this.highestScore = highestScore;
        this.lowestScore = lowestScore;
    }

    public long getQuizzesTaken() { return quizzesTaken; }
    public double getAverageScore() { return averageScore; }
    public int getHighestScore() { return highestScore; }
    public int getLowestScore() { return lowestScore; }
}
