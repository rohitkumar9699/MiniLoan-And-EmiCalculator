package com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.service;

import com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.dto.LoanRequest;
import com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.entity.Loan;
import com.example.MiniLoanAndEMICalculator_Backend.MiniLoan.repository.LoanRepository;
import com.example.MiniLoanAndEMICalculator_Backend.emiCalculator.dto.EmiRequest;
import com.example.MiniLoanAndEMICalculator_Backend.emiCalculator.dto.EmiResponse;
import com.example.MiniLoanAndEMICalculator_Backend.emiCalculator.service.EmiService;
import org.springframework.stereotype.Service;



@Service
public class LoanService  extends EmiService {

    private final LoanRepository loanRepository;

    public LoanService(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    public Loan applyLoan(LoanRequest request) {

        Loan loan = new Loan();
        loan.setUserId(request.getUserId());
        loan.setAmount(request.getAmount());
        loan.setTenure(request.getTenure());


        double interest = calculateRate(request.getAmount(),request.getTenure());
        loan.setInterestRate(interest);

        EmiRequest obj = new EmiRequest();
        obj.setMonths(request.getTenure());
        obj.setAmount(request.getAmount());
        EmiResponse emi = calculateEmi(obj);

        loan.setEmi(emi.getMonthlyEmi());

        return loanRepository.save(loan);
    }
}
