package com.example.MiniLoanAndEMICalculator_Backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            message.setFrom("noreply@miniloan.com");
            mailSender.send(message);
            logger.info("Email sent successfully to: {}", to);
        } catch (Exception e) {
            logger.error("Error sending email to {}: {}", to, e.getMessage());
            // Email failure should not block user registration/operations
        }
    }

    public void sendPasswordEmail(String email, String password) {
        String subject = "Your Mini Loan Account Password";
        String body = "Your account has been created successfully.\n\n" +
                "Your temporary password is: " + password + "\n\n" +
                "Please change your password after logging in.\n\n" +
                "Best regards,\nMini Loan Team";
        sendEmail(email, subject, body);
    }

    public void sendResetPasswordEmail(String email, String newPassword) {
        String subject = "Password Reset - Mini Loan";
        String body = "Your password has been reset successfully.\n\n" +
                "Your new password is: " + newPassword + "\n\n" +
                "Please change your password after logging in.\n\n" +
                "Best regards,\nMini Loan Team";
        sendEmail(email, subject, body);
    }
}
