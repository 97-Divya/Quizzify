package com.example.backend.Repository;

import com.example.backend.Entity.Attempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AttemptRepository extends JpaRepository<Attempt, Long> {

    List<Attempt> findByQuizId(Long quizId);

    List<Attempt> findByStudentUsername(String studentUsername);

    // Custom query to get student stats: count, avg score, max score, min score
    @Query("SELECT COUNT(a), AVG(a.score), MAX(a.score), MIN(a.score) " +
           "FROM Attempt a WHERE a.studentUsername = :username")
    Object[] findStudentStats(@Param("username") String username);
}
