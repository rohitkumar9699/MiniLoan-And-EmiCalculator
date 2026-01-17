package com.example.MiniLoanAndEMICalculator_Backend.util;

public class TokenExtractorUtil {
    private static final String BEARER_PREFIX = "Bearer ";

    public static String extractToken(String authorizationHeader) {
        if (authorizationHeader == null || authorizationHeader.isBlank()) {
            throw new IllegalArgumentException("Authorization header is missing");
        }
        
        if (!authorizationHeader.startsWith(BEARER_PREFIX)) {
            throw new IllegalArgumentException("Invalid authorization header format");
        }
        
        return authorizationHeader.substring(BEARER_PREFIX.length());
    }
}
