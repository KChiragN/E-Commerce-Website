package com.example.ECommerce.Website.controller;

import com.example.ECommerce.Website.entity.User;
import com.example.ECommerce.Website.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            System.out.println("Registration failed: User with the given email already exists");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // User with the given email already exists
        }
        User savedUser = userRepository.save(user);
        System.out.println("Registration successful");
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser == null || !existingUser.getPassword().equals(user.getPassword())) {
            System.out.println("Login failed: User not found or password incorrect");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // User not found or password incorrect
        }
        System.out.println("Login successful");
        return ResponseEntity.ok(existingUser);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Integer> getMostRecentUserId() {
        try {
            User mostRecentUser = userRepository.findTopByOrderByUserIdDesc();
            if (mostRecentUser != null) {
                return ResponseEntity.ok(mostRecentUser.getUserId());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.out.println("Error fetching most recent user ID: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
