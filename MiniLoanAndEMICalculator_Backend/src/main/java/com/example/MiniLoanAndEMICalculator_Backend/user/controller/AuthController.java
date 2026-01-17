package com.example.MiniLoanAndEMICalculator_Backend.user.controller;

import com.example.MiniLoanAndEMICalculator_Backend.user.dto.*;
import com.example.MiniLoanAndEMICalculator_Backend.user.entity.User;
import com.example.MiniLoanAndEMICalculator_Backend.user.service.UserService;
import com.example.MiniLoanAndEMICalculator_Backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:3000}")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody SignupRequest request) {
        try {
            userService.registerUser(request);
            return ResponseEntity.ok("User registered successfully. Check your email for password.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            User user = userService.getUserByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Invalid credentials"));
            
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new RuntimeException("Invalid credentials");
            }

            String token = jwtUtil.generateToken(user.getEmail());
            LoginResponse response = new LoginResponse(token, user.getEmail(), user.getName(), user.getRole(), user.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        try {
            userService.resetPassword(request.getEmail());
            return ResponseEntity.ok("New password sent to your email");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok("Logout successful");
    }
}
