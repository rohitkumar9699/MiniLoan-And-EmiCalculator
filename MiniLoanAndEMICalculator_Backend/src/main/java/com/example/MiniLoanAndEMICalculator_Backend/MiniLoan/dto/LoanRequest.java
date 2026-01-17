package com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.dto;

import jakarta.validation.constraints.*;

public class LoanRequest {

    @NotNull
    @Min(1000)
    @Max(50000)
    private Double loanAmount;

    @NotNull
    @Min(1)
    @Max(24)
    private Integer tenure;

    public LoanRequest() {}

    public LoanRequest(Double loanAmount, Integer tenure) {
        this.loanAmount = loanAmount;
        this.tenure = tenure;
    }

    // Getters and Setters
    public Double getLoanAmount() {
        return loanAmount;
    }

    public void setLoanAmount(Double loanAmount) {
        this.loanAmount = loanAmount;
    }

    public Integer getTenure() {
        return tenure;
    }

    public void setTenure(Integer tenure) {
        this.tenure = tenure;
    }
}
