package com.example.MiniLoanAndEMICalculator_Backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
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
        } catch (Exception e) {
            System.out.println("Error sending email: " + e.getMessage());
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
