package com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.repository;

import com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByLoanId(Long loanId);
}
