package com.example.MiniLoanAndEMICalculator_Backend.admin.controller;

import com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.entity.Loan;
import com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.service.LoanService;
import com.example.MiniLoanAndEMICalculator_Backend.user.entity.User;
import com.example.MiniLoanAndEMICalculator_Backend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:3000}")
public class AdminController {
    @Autowired
    private LoanService loanService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/loans/pending")
    public ResponseEntity<?> getPendingLoans() {
        try {
            List<Loan> loans = loanService.getPendingLoans();
            return ResponseEntity.ok(loans);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/loans/approved")
    public ResponseEntity<?> getApprovedLoans() {
        try {
            List<Loan> loans = loanService.getApprovedLoans();
            return ResponseEntity.ok(loans);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/loans/rejected")
    public ResponseEntity<?> getRejectedLoans() {
        try {
            List<Loan> loans = loanService.getRejectedLoans();
            return ResponseEntity.ok(loans);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/loan/approve/{loanId}")
    public ResponseEntity<?> approveLoan(@PathVariable Long loanId) {
        try {
            Loan loan = loanService.approveLoan(loanId);
            return ResponseEntity.ok(loan);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/loan/reject/{loanId}")
    public ResponseEntity<?> rejectLoan(@PathVariable Long loanId) {
        try {
            Loan loan = loanService.rejectLoan(loanId);
            return ResponseEntity.ok(loan);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
