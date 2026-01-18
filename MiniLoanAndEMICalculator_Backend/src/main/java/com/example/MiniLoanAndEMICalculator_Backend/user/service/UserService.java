package com.example.MiniLoanAndEMICalculator_Backend.user.service;

import com.example.MiniLoanAndEMICalculator_Backend.user.entity.User;
import com.example.MiniLoanAndEMICalculator_Backend.user.repository.UserRepository;
import com.example.MiniLoanAndEMICalculator_Backend.user.dto.*;
import com.example.MiniLoanAndEMICalculator_Backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
    }

    public User registerUser(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        if (userRepository.existsByAadhaarNumber(request.getAadhaarNumber())) {
            throw new RuntimeException("Aadhaar already exists");
        }
        if (userRepository.existsByPanNumber(request.getPanNumber())) {
            throw new RuntimeException("PAN already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setOccupation(request.getOccupation());
        user.setMonthlyIncome(request.getMonthlyIncome());
        user.setAadhaarNumber(request.getAadhaarNumber());
        user.setPanNumber(request.getPanNumber());
        user.setRole("ROLE_USER");
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(user);
        return savedUser;
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void updateProfile(Long userId, UpdateProfileRequest request) {
        User user = getUserById(userId);
        user.setOccupation(request.getOccupation());
        user.setMonthlyIncome(request.getMonthlyIncome());
        userRepository.save(user);
    }

    public void changePassword(Long userId, ChangePasswordRequest request) {
        User user = getUserById(userId);
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    public void resetPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        String newPassword = generateRandomPassword();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        emailService.sendResetPasswordEmail(email, newPassword);
    }

    public User registerUserAsAdmin(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        if (userRepository.existsByAadhaarNumber(request.getAadhaarNumber())) {
            throw new RuntimeException("Aadhaar already exists");
        }
        if (userRepository.existsByPanNumber(request.getPanNumber())) {
            throw new RuntimeException("PAN already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setOccupation(request.getOccupation());
        user.setMonthlyIncome(request.getMonthlyIncome());
        user.setAadhaarNumber(request.getAadhaarNumber());
        user.setPanNumber(request.getPanNumber());
        user.setRole("ROLE_ADMIN"); // Register as admin
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(user);
        return savedUser;
    }

    private String generateRandomPassword() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
        StringBuilder password = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 12; i++) {
            password.append(characters.charAt(random.nextInt(characters.length())));
        }
        return password.toString();
    }
}
