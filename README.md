# Mini Loan & EMI Calculator

Get instant EMI calculations for your mini loan needs. Transparent, fast, and completely free.

## Features

✨ **Variable Interest Rates** - Know exactly what you pay with transparent monthly rates  
⚡ **Instant Calculation** - Get your EMI breakdown instantly without hidden fees  
🔒 **Secure & Transparent** - All calculations happen locally in your browser  
🎯 **Clear Limits** - Loan amounts from ₹1,000 to ₹50,000 with 1-24 months tenure  

## Loan Eligibility

- **Loan Amount**: ₹1,000 – ₹50,000
- **Loan Duration**: 1 – 24 months
- **Interest Rate**: Per month (Variable)

## Tech Stack

- **Frontend**: Angular
- **Backend**: Spring Boot
- **Database**: MySQL / PostgreSQL
- **Security**: JWT Authentication

## Getting Started

### Backend Setup (Spring Boot)
```bash
cd MiniLoanAndEMICalculator_Backend
mvn clean install
mvn spring-boot:run
```

### Frontend Setup (Angular)
```bash
cd Frontend
npm install
ng serve
```

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/loan/apply` - Apply for loan
- `GET /api/emi/calculate` - Calculate EMI
- `GET /api/loans/history` - Get loan history

## Installation

1. Clone the repository
2. Configure database in `application.properties`
3. Run backend on `http://localhost:8080`
4. Run frontend on `http://localhost:4200`

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.
