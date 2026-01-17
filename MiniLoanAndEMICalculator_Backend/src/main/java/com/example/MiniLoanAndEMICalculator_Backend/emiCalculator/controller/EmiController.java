package com.example.MiniLoanAndEMICalculator_Backend.emiCalculator.controller;

import com.example.MiniLoanAndEMICalculator_Backend.emiCalculator.dto.EmiRequest;
import com.example.MiniLoanAndEMICalculator_Backend.emiCalculator.dto.EmiResponse;
import com.example.MiniLoanAndEMICalculator_Backend.emiCalculator.service.EmiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/emi")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:3000}")
public class EmiController {

    private final EmiService emiService;

    public EmiController(EmiService emiService) {
        this.emiService = emiService;
    }

    @PostMapping("/calculate")
    public ResponseEntity<EmiResponse> calculateEmi(@RequestBody EmiRequest request) {
        EmiResponse response = emiService.calculateEmi(request);
        return ResponseEntity.ok(response);
    }
}
