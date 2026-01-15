src/main/java/com/example/miniloan
├── MiniLoanApplication.java       # Main Spring Boot class
├── config
│   └── SecurityConfig.java       # Spring Security + JWT config
├── security
│   ├── JwtAuthenticationEntryPoint.java
│   ├── JwtRequestFilter.java
│   └── JwtUtil.java
├── user
│   ├── controller
│   │   └── UserController.java
│   ├── dto
│   │   ├── LoginRequest.java
│   │   ├── LoginResponse.java
│   │   └── SignupRequest.java
│   ├── entity
│   │   └── User.java
│   ├── repository
│   │   └── UserRepository.java
│   └── service
│       └── UserService.java
├── loan
│   ├── controller
│   │   └── LoanController.java
│   ├── dto
│   │   └── LoanRequest.java
│   ├── entity
│   │   └── Loan.java
│   ├── repository
│   │   └── LoanRepository.java
│   └── service
│       └── LoanService.java
    emi
    ├── controller
    │   └── EmiController.java
    ├── dto
    │   ├── EmiRequest.java
    │   └── EmiResponse.java
    ├── service
    │   └── EmiService.java
