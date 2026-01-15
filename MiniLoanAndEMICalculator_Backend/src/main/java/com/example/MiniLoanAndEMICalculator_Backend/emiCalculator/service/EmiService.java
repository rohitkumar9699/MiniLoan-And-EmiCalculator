package com.example.MiniLoanAndEMICalculator_Backend.emiCalculator.service;

import com.example.MiniLoanAndEMICalculator_Backend.emiCalculator.dto.EmiRequest;
import com.example.MiniLoanAndEMICalculator_Backend.emiCalculator.dto.EmiResponse;
import org.springframework.stereotype.Service;

@Service
public class EmiService {

    private static final double MIN_AMOUNT = 1000.0;
    private static final double MAX_AMOUNT = 50000.0;
    private static final int MIN_MONTHS = 1;
    private static final int MAX_MONTHS = 24;
    private static final double MAX_RATE = 10.0; // %
    private static final double MIN_RATE = 3.0;  // %

    public EmiResponse calculateEmi(EmiRequest request) {
        double amount = request.getAmount();
        int months = request.getMonths();

        // Guard
        if (amount <= 0 || months <= 0) {
            throw new IllegalArgumentException("Amount and months must be positive.");
        }

        // 1️⃣ Calculate annual interest rate dynamically
        double monthlyRates = calculateRate(amount, months); // in %

        // 2️⃣ Convert to monthly rate (decimal)
        double monthlyRate = monthlyRates / 100.0;

        // 3️⃣ EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
        double totalInterest =  amount * months * monthlyRate;
        double totalPayment = amount + totalInterest;

        double emi = totalPayment/ months;


        // Round to 2 decimal places
        emi = round(emi, 2);
        totalPayment = round(totalPayment, 2);
        totalInterest = round(totalInterest, 2);
        monthlyRates = round(monthlyRates, 2);

        return new EmiResponse(
                amount,
                months,
                monthlyRates,
                emi,
                totalInterest,
                totalPayment
        );
    }

    /**
     * Dynamic rate calculation based on amount and duration.
     * Uses smooth scaling between MIN_RATE and MAX_RATE.
     */
    protected double calculateRate(double amount, int months) {
        // Clamp values to defined ranges
        double amt = Math.min(Math.max(amount, MIN_AMOUNT), MAX_AMOUNT);
        int m = Math.min(Math.max(months, MIN_MONTHS), MAX_MONTHS);

        double amountRatio =
                (amt - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT);  // 0 to 1
        double durationRatio =
                (m - MIN_MONTHS) / (double) (MAX_MONTHS - MIN_MONTHS); // 0 to 1

        // Amount effect: higher amount → lower rate
        double amountRate = MAX_RATE - (MAX_RATE - MIN_RATE) * amountRatio;

        // Duration effect: longer duration → lower rate
        double durationRate = MAX_RATE - (MAX_RATE - MIN_RATE) * durationRatio;

        // Final rate = average of both effects
        double rate = (amountRate + durationRate) / 2.0;

        // Bound rate
        if (rate < MIN_RATE) rate = MIN_RATE;
        if (rate > MAX_RATE) rate = MAX_RATE;

        return rate;
    }

    private double round(double value, int places) {
        if (places < 0) return value;
        double factor = Math.pow(10, places);
        return Math.round(value * factor) / factor;
    }
}
