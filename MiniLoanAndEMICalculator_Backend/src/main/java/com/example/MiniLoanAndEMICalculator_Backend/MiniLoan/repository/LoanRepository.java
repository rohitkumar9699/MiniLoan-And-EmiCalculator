package com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.repository;

import com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByUserId(Long userId);
    Optional<Loan> findByUserIdAndStatus(Long userId, Loan.LoanStatus status);
    List<Loan> findByStatus(Loan.LoanStatus status);
    Optional<Loan> findByIdAndUserId(Long id, Long userId);
    List<Loan> findAllByUserIdAndStatus(Long userId, Loan.LoanStatus status);
}
