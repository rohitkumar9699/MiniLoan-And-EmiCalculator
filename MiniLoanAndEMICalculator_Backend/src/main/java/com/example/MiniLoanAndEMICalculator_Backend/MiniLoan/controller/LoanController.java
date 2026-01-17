package com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.controller;

import com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.dto.*;
import com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.entity.Loan;
import com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.service.LoanService;
import com.example.MiniLoanAndEMICalculator_Backend.user.service.UserService;
import com.example.MiniLoanAndEMICalculator_Backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/loan")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:3000}")
public class LoanController {
    @Autowired
    private LoanService loanService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/apply")
    public ResponseEntity<?> applyLoan(@RequestHeader("Authorization") String token, @Valid @RequestBody LoanRequest request) {
        try {
            String email = jwtUtil.extractUsername(token.replace("Bearer ", ""));
            Long userId = userService.getUserByEmail(email).orElseThrow(() -> new RuntimeException("User not found")).getId();
            Loan loan = loanService.applyLoan(userId, request.getLoanAmount(), request.getTenure());
            return ResponseEntity.ok(loan);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/current")
    public ResponseEntity<?> getCurrentLoan(@RequestHeader("Authorization") String token) {
        try {
            String email = jwtUtil.extractUsername(token.replace("Bearer ", ""));
            Long userId = userService.getUserByEmail(email).orElseThrow(() -> new RuntimeException("User not found")).getId();
            Loan loan = loanService.getCurrentLoan(userId);
            return ResponseEntity.ok(loan);
        } catch (Exception e) {
            return ResponseEntity.ok("{\"message\": \"No active loan\"}");
        }
    }

    @GetMapping("/history")
    public ResponseEntity<?> getLoanHistory(@RequestHeader("Authorization") String token) {
        try {
            String email = jwtUtil.extractUsername(token.replace("Bearer ", ""));
            Long userId = userService.getUserByEmail(email).orElseThrow(() -> new RuntimeException("User not found")).getId();
            List<Loan> loans = loanService.getUserLoanHistory(userId);
            return ResponseEntity.ok(loans);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/pay")
    public ResponseEntity<?> payEmi(@RequestHeader("Authorization") String token, @Valid @RequestBody PaymentRequest request) {
        try {
            String email = jwtUtil.extractUsername(token.replace("Bearer ", ""));
            Long userId = userService.getUserByEmail(email).orElseThrow(() -> new RuntimeException("User not found")).getId();
            Loan loan = loanService.getCurrentLoan(userId);
            loanService.payEmi(loan.getId(), request.getAmount());
            return ResponseEntity.ok("Payment successful");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
