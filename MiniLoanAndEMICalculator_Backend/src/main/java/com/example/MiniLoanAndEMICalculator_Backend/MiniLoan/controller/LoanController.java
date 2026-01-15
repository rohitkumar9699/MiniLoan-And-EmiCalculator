package com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.controller;

import com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.dto.LoanRequest;
import com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.entity.Loan;
import com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.service.LoanService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/loan")
public class LoanController {

    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    @PostMapping("/apply")
    public Loan applyLoan(@RequestBody LoanRequest request) {
        return loanService.applyLoan(request);
    }
}
