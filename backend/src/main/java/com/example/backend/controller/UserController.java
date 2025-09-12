package com.example.backend.controller;

import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Vite frontend
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Register user
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(userRepository.save(user));
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(existingUser.get().getRole()); // send role
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    // Dashboard
    @GetMapping("/dashboard/{role}")
    public ResponseEntity<String> dashboard(@PathVariable String role) {
        switch (role.toLowerCase()) {
            case "student":
                return ResponseEntity.ok("Welcome Student Dashboard!");
            case "instructor":
                return ResponseEntity.ok("Welcome Instructor Dashboard!");
            case "admin":
                return ResponseEntity.ok("Welcome Admin Dashboard!");
            default:
                return ResponseEntity.status(403).body("Access Denied");
        }
    }

    // --------------------- ADMIN CRUD -----------------------

    // Get all students
    @GetMapping("/admin/students")
    public List<User> getAllStudents() {
        return userRepository.findByRole("student");
    }

    // Get all instructors
    @GetMapping("/admin/instructors")
    public List<User> getAllInstructors() {
        return userRepository.findByRole("instructor");
    }

    // Create student/instructor
    @PostMapping("/admin/users")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Update user
    @PutMapping("/admin/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(userDetails.getUsername());
                    user.setPassword(userDetails.getPassword());
                    user.setRole(userDetails.getRole());
                    return ResponseEntity.ok(userRepository.save(user));
                }).orElse(ResponseEntity.notFound().build());
    }

    // Delete user
    @DeleteMapping("/admin/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully");
        }
        return ResponseEntity.status(404).body("User not found");
    }
}
