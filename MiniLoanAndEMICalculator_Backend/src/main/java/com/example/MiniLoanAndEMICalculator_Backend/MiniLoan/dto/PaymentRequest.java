package com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.dto;

import jakarta.validation.constraints.*;

public class PaymentRequest {
    @NotNull
    @Min(0)
    private Double amount;

    // Constructors
    public PaymentRequest() {}

    public PaymentRequest(Double amount) {
        this.amount = amount;
    }

    // Getters and Setters
    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
