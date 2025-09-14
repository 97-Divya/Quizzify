package com.example.backend.Repository;

import com.example.backend.Entity.Attempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AttemptRepository extends JpaRepository<Attempt, Long> {

    List<Attempt> findByQuiz_Id(Long quizId); // updated to match ManyToOne field

    List<Attempt> findByStudentUsername(String studentUsername);

    // Stats for all quizzes (highest, avg)
    @Query("SELECT a.quiz.id, MAX(a.score), AVG(a.score) FROM Attempt a GROUP BY a.quiz.id")
    List<Object[]> getQuizStats();

    // Stats for a specific student
    @Query("SELECT COUNT(a), AVG(a.score), MAX(a.score), MIN(a.score) " +
           "FROM Attempt a WHERE a.studentUsername = :username")
    Object[] findStudentStats(@Param("username") String username);
}
