package com.example.MiniLoanAndEMICalculator_Backend.user.controller;

import com.example.MiniLoanAndEMICalculator_Backend.user.dto.*;
import com.example.MiniLoanAndEMICalculator_Backend.user.entity.User;
import com.example.MiniLoanAndEMICalculator_Backend.user.service.UserService;
import com.example.MiniLoanAndEMICalculator_Backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:3000}")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String token) {
        try {
            String email = jwtUtil.extractUsername(token.replace("Bearer ", ""));
            User user = userService.getUserByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@RequestHeader("Authorization") String token, @RequestBody UpdateProfileRequest request) {
        try {
            String email = jwtUtil.extractUsername(token.replace("Bearer ", ""));
            User user = userService.getUserByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
            userService.updateProfile(user.getId(), request);
            return ResponseEntity.ok("Profile updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestHeader("Authorization") String token, @RequestBody ChangePasswordRequest request) {
        try {
            String email = jwtUtil.extractUsername(token.replace("Bearer ", ""));
            User user = userService.getUserByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
            userService.changePassword(user.getId(), request);
            return ResponseEntity.ok("Password changed successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
