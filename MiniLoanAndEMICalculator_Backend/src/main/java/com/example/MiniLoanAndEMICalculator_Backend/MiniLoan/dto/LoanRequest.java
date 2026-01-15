package com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.dto;

public class LoanRequest {

    private Long userId;       // must be Long
    private Double amount;
    private Integer tenure;
    private Double interestRate;

    public LoanRequest() {}

    // Getters & Setters
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Double getAmount() {
        return amount;
    }
    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Integer getTenure() {
        return tenure;
    }
    public void setTenure(Integer tenure) {
        this.tenure = tenure;
    }

    public Double getInterestRate() {
        return interestRate;
    }
//    public void setInterestRate(Double interestRate) {
//        this.interestRate = interestRate;
//    }
}
