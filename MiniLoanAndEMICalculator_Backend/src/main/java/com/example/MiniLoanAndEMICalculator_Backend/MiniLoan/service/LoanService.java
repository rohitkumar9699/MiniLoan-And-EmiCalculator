package com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.service;

import com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.entity.Loan;
import com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.entity.Payment;
import com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.repository.LoanRepository;
import com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.repository.PaymentRepository;
import com.example.MiniLoanAndEMICalculator_Backend.user.entity.User;
import com.example.MiniLoanAndEMICalculator_Backend.user.service.UserService;
import com.example.MiniLoanAndEMICalculator_Backend.util.EmiCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class LoanService {
    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserService userService;

    public Loan applyLoan(Long userId, Double loanAmount, Integer tenure) {
        User user = userService.getUserById(userId);
        
        // Check if user already has an active loan
        Optional<Loan> existingLoan = loanRepository.findByUserIdAndStatus(userId, Loan.LoanStatus.APPROVED);
        if (existingLoan.isPresent()) {
            throw new RuntimeException("User already has an active loan");
        }

        // Calculate interest rate based on income
        Double interestRate = EmiCalculator.getInterestRate(user.getMonthlyIncome());
        
        // Calculate EMI
        Double emi = EmiCalculator.calculateEmi(loanAmount, interestRate, tenure);
        Double totalPayable = EmiCalculator.calculateTotalPayable(emi, tenure);

        Loan loan = new Loan();
        loan.setUserId(userId);
        loan.setLoanAmount(loanAmount);
        loan.setInterestRate(interestRate);
        loan.setTenure(tenure);
        loan.setEmi(Math.round(emi * 100.0) / 100.0);
        loan.setTotalPayable(Math.round(totalPayable * 100.0) / 100.0);
        loan.setRemainingAmount(loan.getTotalPayable());
        loan.setStatus(Loan.LoanStatus.PENDING);

        return loanRepository.save(loan);
    }

    public Loan approveLoan(Long loanId) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));
        loan.setStatus(Loan.LoanStatus.APPROVED);
        loan.setStartDate(LocalDateTime.now());
        Loan approvedLoan = loanRepository.save(loan);
        
        // Auto-reject all other pending loans for this user
        List<Loan> otherPendingLoans = loanRepository.findAllByUserIdAndStatus(loan.getUserId(), Loan.LoanStatus.PENDING);
        for (Loan pendingLoan : otherPendingLoans) {
            pendingLoan.setStatus(Loan.LoanStatus.REJECTED);
            loanRepository.save(pendingLoan);
        }
        
        return approvedLoan;
    }

    public Loan rejectLoan(Long loanId) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));
        loan.setStatus(Loan.LoanStatus.REJECTED);
        return loanRepository.save(loan);
    }

    public Loan getCurrentLoan(Long userId) {
        return loanRepository.findByUserIdAndStatus(userId, Loan.LoanStatus.APPROVED)
                .orElseThrow(() -> new RuntimeException("No active loan found"));
    }

    public List<Loan> getUserLoanHistory(Long userId) {
        return loanRepository.findByUserId(userId);
    }

    public List<Loan> getPendingLoans() {
        return loanRepository.findByStatus(Loan.LoanStatus.PENDING);
    }

    public List<Loan> getApprovedLoans() {
        return loanRepository.findByStatus(Loan.LoanStatus.APPROVED);
    }

    public List<Loan> getRejectedLoans() {
        return loanRepository.findByStatus(Loan.LoanStatus.REJECTED);
    }

    public void payEmi(Long loanId, Double amount) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        if (loan.getStatus() != Loan.LoanStatus.APPROVED) {
            throw new RuntimeException("Loan is not active");
        }

        if (amount > loan.getRemainingAmount()) {
            throw new RuntimeException("Payment amount exceeds remaining balance");
        }

        loan.setPaidAmount(loan.getPaidAmount() + amount);
        loan.setRemainingAmount(loan.getRemainingAmount() - amount);

        if (loan.getRemainingAmount() <= 0) {
            loan.setStatus(Loan.LoanStatus.COMPLETED);
            loan.setEndDate(LocalDateTime.now());
        }

        loanRepository.save(loan);

        Payment payment = new Payment();
        payment.setLoanId(loanId);
        payment.setAmountPaid(amount);
        payment.setPaymentType(Payment.PaymentType.EMI);
        paymentRepository.save(payment);
    }

    public void payFullLoan(Long loanId, Double amount) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        if (loan.getStatus() != Loan.LoanStatus.APPROVED) {
            throw new RuntimeException("Loan is not active");
        }

        if (amount < loan.getRemainingAmount()) {
            throw new RuntimeException("Insufficient amount to close the loan");
        }

        loan.setPaidAmount(loan.getTotalPayable());
        loan.setRemainingAmount(0.0);
        loan.setStatus(Loan.LoanStatus.COMPLETED);
        loan.setEndDate(LocalDateTime.now());
        loanRepository.save(loan);

        Payment payment = new Payment();
        payment.setLoanId(loanId);
        payment.setAmountPaid(amount);
        payment.setPaymentType(Payment.PaymentType.FULL);
        paymentRepository.save(payment);
    }

    public List<Payment> getLoanPayments(Long loanId) {
        return paymentRepository.findByLoanId(loanId);
    }
}
