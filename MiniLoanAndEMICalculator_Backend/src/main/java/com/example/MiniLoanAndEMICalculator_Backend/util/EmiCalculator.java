package com.example.MiniLoanAndEMICalculator_Backend.util;

public class EmiCalculator {
    /**
     * Calculate EMI using the formula: P * R * (1 + R)^N / ((1 + R)^N - 1)
     */
    public static Double calculateEmi(Double principal, Double annualRate, Integer tenureMonths) {
        if (principal <= 0 || annualRate < 0 || tenureMonths <= 0) {
            throw new IllegalArgumentException("Invalid parameters");
        }

        double monthlyRate = annualRate / 100 / 12;
        
        if (monthlyRate == 0) {
            return principal / tenureMonths;
        }

        double numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths);
        double denominator = Math.pow(1 + monthlyRate, tenureMonths) - 1;
        return numerator / denominator;
    }

    public static Double calculateTotalPayable(Double emi, Integer tenureMonths) {
        return emi * tenureMonths;
    }

    public static Double getInterestRate(Double monthlyIncome) {
        if (monthlyIncome < 20000) {
            return 15.0;
        } else if (monthlyIncome < 50000) {
            return 12.0;
        } else if (monthlyIncome < 100000) {
            return 10.0;
        } else {
            return 8.0;
        }
    }
}
