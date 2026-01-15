package com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.repository;

import com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface LoanRepository extends JpaRepository<Loan, Long> {

    List<Loan> findByUserId(Long userId);
}
