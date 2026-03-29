# MiniLoan & EMI Calculator Backend

A Spring Boot-based RESTful backend service for managing micro loans and calculating EMI (Equated Monthly Installment) with JWT authentication, email notifications, and admin features.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Security](#security)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **User Management**: User registration, login, and profile management
- **Authentication**: JWT-based authentication and authorization
- **Loan Management**: Create, view, and manage loan applications
- **EMI Calculator**: Calculate monthly installments for loans
- **Payment Tracking**: Track and manage loan payments
- **Email Notifications**: Send email confirmations and notifications
- **Admin Panel**: Admin-specific endpoints for system management
- **Password Management**: Change password and reset password functionality
- **CORS Support**: Configured for frontend integration

## 🛠 Technology Stack

- **Framework**: Spring Boot 3.5.8
- **Java Version**: 17
- **Database**: H2 (Development) / PostgreSQL (Production)
- **ORM**: Spring Data JPA
- **Security**: Spring Security + JWT
- **Email**: Spring Mail (Gmail SMTP)
- **Build Tool**: Maven
- **Validation**: Spring Validation

## 📦 Prerequisites

- **Java 17** or higher
- **Maven 3.6+**
- **Git**
- Email account (Gmail recommended for notifications)

Optional:
- PostgreSQL 12+ (for production)
- Docker

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd MiniLoanAndEMICalculator/MiniLoanAndEMICalculator_Backend
```

### 2. Install Dependencies

```bash
mvn clean install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root or set environment variables:

```bash
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

### 4. Build the Project

```bash
mvn clean package
```

## ⚙️ Configuration

### Application Properties

Key configurations in `src/main/resources/application.properties`:

#### Database Configuration
```properties
spring.datasource.url=jdbc:h2:mem:miniloandb
spring.datasource.driverClassName=org.h2.Driver
spring.jpa.hibernate.ddl-auto=create-drop
```

#### JWT Configuration
```properties
app.jwt.secret=<your-secure-key>
app.jwt.expiration=86400000  # 24 hours
```

#### Email Configuration
```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=${MAIL_USERNAME}
spring.mail.password=${MAIL_PASSWORD}
```

#### CORS Configuration
```properties
app.cors.allowed-origins=http://localhost:3000,https://your-frontend-url
```

#### Server Configuration
```properties
server.port=8080
```

### Switching to PostgreSQL

For production use, update `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/miniloandb
spring.datasource.driverClassName=org.postgresql.Driver
spring.datasource.username=postgres
spring.datasource.password=your-password
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQL10Dialect
spring.jpa.hibernate.ddl-auto=validate
```

## 📁 Project Structure

```
src/main/java/com/example/MiniLoanAndEMICalculator_Backend/
├── admin/                    # Admin-related endpoints
│   └── controller/
│       └── AdminController.java
├── emiCalculator/           # EMI calculation logic
│   ├── controller/
│   │   └── EmiController.java
│   ├── dto/
│   │   ├── EmiRequest.java
│   │   └── EmiResponse.java
│   └── service/
│       └── EmiService.java
├── MiniLoan/               # Loan management
│   ├── controller/
│   │   └── LoanController.java
│   ├── dto/
│   │   ├── LoanRequest.java
│   │   ├── LoanResponse.java
│   │   └── PaymentRequest.java
│   ├── entity/
│   │   ├── Loan.java
│   │   └── Payment.java
│   ├── repository/
│   │   ├── LoanRepository.java
│   │   └── PaymentRepository.java
│   └── service/
│       └── LoanService.java
├── security/               # JWT & Security
│   ├── JwtAuthenticationEntryPoint.java
│   ├── JwtRequestFilter.java
│   └── JwtUtil.java
├── user/                   # User management
│   ├── controller/
│   │   ├── AuthController.java
│   │   └── UserController.java
│   ├── dto/
│   │   ├── LoginRequest.java
│   │   ├── LoginResponse.java
│   │   ├── ChangePasswordRequest.java
│   │   └── ResetPasswordRequest.java
│   ├── entity/
│   │   └── User.java
│   ├── repository/
│   │   └── UserRepository.java
│   └── service/
│       └── UserService.java
├── config/                 # Application configuration
│   ├── SecurityConfig.java
│   └── WebConfig.java
├── service/
│   └── EmailService.java
├── util/                   # Utility classes
│   ├── EmiCalculator.java
│   └── TokenExtractorUtil.java
└── MiniLoanAndEmiCalculatorBackendApplication.java
```

## 🔌 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user (returns JWT) |
| POST | `/api/auth/change-password` | Change user password |
| POST | `/api/auth/forgot-password` | Request password reset |

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get user profile |
| PUT | `/api/users/profile` | Update user profile |
| GET | `/api/users/{id}` | Get user by ID |

### Loan Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/loans/apply` | Apply for a new loan |
| GET | `/api/loans` | Get all loans for user |
| GET | `/api/loans/{id}` | Get loan details |
| PUT | `/api/loans/{id}` | Update loan |
| DELETE | `/api/loans/{id}` | Cancel loan |

### EMI Calculator Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/emi/calculate` | Calculate EMI |

### Payment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments` | Create payment |
| GET | `/api/payments/loan/{loanId}` | Get payments for loan |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | Get all users (Admin only) |
| GET | `/api/admin/loans` | Get all loans (Admin only) |

## 🗄 Database Schema

### User Entity
- `id` (UUID): Primary key
- `email` (String): Unique email
- `password` (String): Hashed password
- `fullName` (String): User's full name
- `phone` (String): Phone number
- `createdAt` (LocalDateTime): Account creation date
- `updatedAt` (LocalDateTime): Last update date

### Loan Entity
- `id` (UUID): Primary key
- `userId` (UUID): Foreign key to User
- `amount` (BigDecimal): Loan amount
- `interestRate` (Double): Annual interest rate
- `duration` (Integer): Loan duration in months
- `status` (String): PENDING, APPROVED, REJECTED, CLOSED
- `createdAt` (LocalDateTime): Created date
- `approvedAt` (LocalDateTime): Approval date

### Payment Entity
- `id` (UUID): Primary key
- `loanId` (UUID): Foreign key to Loan
- `amount` (BigDecimal): Payment amount
- `dueDate` (LocalDate): Payment due date
- `paidDate` (LocalDate): Actual payment date
- `status` (String): PENDING, COMPLETED, OVERDUE

## 🔒 Security

### JWT Authentication

- All protected endpoints require JWT token in `Authorization` header
- Token format: `Bearer <token>`
- Token expiration: 24 hours (configurable)
- Secrets stored in environment variables

### Password Security

- Passwords are hashed using BCrypt
- Minimum password requirements enforced
- Password reset via email link

### CORS Configuration

- Whitelist frontend origins in `application.properties`
- Default: `http://localhost:3000`

## ▶️ Running the Application

### Development Mode

```bash
mvn spring-boot:run
```

### Packaged JAR

```bash
java -jar target/MiniLoanAndEMICalculator_Backend-0.0.1-SNAPSHOT.jar
```

### With Environment Variables

```bash
java -jar target/MiniLoanAndEMICalculator_Backend-0.0.1-SNAPSHOT.jar \
  --MAIL_USERNAME=your-email@gmail.com \
  --MAIL_PASSWORD=your-password
```

The server will start on `http://localhost:8080`

## 🧪 Testing

Run tests using Maven:

```bash
mvn test
```

Run specific test class:

```bash
mvn test -Dtest=MiniLoanAndEmiCalculatorBackendApplicationTests
```

## 🐛 Troubleshooting

### Issue: JWT Token Not Recognized
**Solution**: Ensure token is sent with correct format: `Authorization: Bearer <token>`

### Issue: Email Not Sending
**Solution**: 
- Verify Gmail account credentials in environment variables
- Enable "Less secure app access" in Gmail settings
- Use App Password if 2FA is enabled

### Issue: CORS Error
**Solution**: Add frontend URL to `app.cors.allowed-origins` in properties

### Issue: Database Connection Failed
**Solution**: 
- For H2: Check if H2 console is accessible at `http://localhost:8080/h2-console`
- For PostgreSQL: Verify database is running and credentials are correct

### Issue: Build Fails
**Solution**:
```bash
mvn clean install -U  # Force update dependencies
mvn clean package -DskipTests  # Skip tests temporarily
```

## 📝 Notes

- This backend uses H2 in-memory database by default (suitable for development)
- Switch to PostgreSQL for production use
- Ensure Java 17 is installed: `java -version`
- Maven is required for building: `mvn -version`

## 📄 License

This project is provided as-is for educational purposes.

## 🤝 Support

For issues or questions, please create an issue in the repository or contact the development team.

---

**Last Updated**: March 2026
