package com.example.MiniLoanAndEMICalculator_Backend.user.dto;

import jakarta.validation.constraints.*;

public class UpdateProfileRequest {
    @NotBlank
    private String occupation;

    @NotNull
    @Min(0)
    private Double monthlyIncome;

    // Constructors
    public UpdateProfileRequest() {}

    // Getters and Setters
    public String getOccupation() {
        return occupation;
    }
    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public Double getMonthlyIncome() {
        return monthlyIncome;
    }
    public void setMonthlyIncome(Double monthlyIncome) {
        this.monthlyIncome = monthlyIncome;
    }
}
