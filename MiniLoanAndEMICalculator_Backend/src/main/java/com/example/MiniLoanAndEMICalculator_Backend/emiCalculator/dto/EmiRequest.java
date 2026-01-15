package com.example.MiniLoanAndEMICalculator_Backend.emiCalculator.dto;

public class EmiRequest {

    private double amount;   // loan amount
    private int months;      // duration in months

    public EmiRequest() {
    }

    public EmiRequest(double amount, int months) {
        this.amount = amount;
        this.months = months;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public int getMonths() {
        return months;
    }

    public void setMonths(int months) {
        this.months = months;
    }
}
