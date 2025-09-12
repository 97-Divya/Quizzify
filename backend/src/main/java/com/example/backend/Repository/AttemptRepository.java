package com.example.backend.Repository;

import com.example.backend.Entity.Attempt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AttemptRepository extends JpaRepository<Attempt, Long> {
    List<Attempt> findByStudentUsername(String username);
}
