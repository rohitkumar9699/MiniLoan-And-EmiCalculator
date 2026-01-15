package com.example.MiniLoanAndEMICalculator_Backend.user.controller;

import com.example.MiniLoanAndEMICalculator_Backend.security.JwtUtil;
import com.example.MiniLoanAndEMICalculator_Backend.user.dto.LoginRequest;
import com.example.MiniLoanAndEMICalculator_Backend.user.dto.LoginResponse;
import com.example.MiniLoanAndEMICalculator_Backend.user.dto.SignupRequest;
import com.example.MiniLoanAndEMICalculator_Backend.user.entity.User;
import com.example.MiniLoanAndEMICalculator_Backend.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public UserController(UserService userService,
                          JwtUtil jwtUtil,
                          AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/signup")
    public User signup(@Valid @RequestBody SignupRequest signupRequest) {
        return userService.registerUser(signupRequest);
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid Credentials");
        }

        User user = userService.getUserByEmail(loginRequest.getEmail());
        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponse(token);
    }
}
