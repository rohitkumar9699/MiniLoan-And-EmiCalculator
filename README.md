# Mini Loan & EMI Calculator

> **Status**: ✅ Fully Functional - All Frontend & Backend Issues Fixed

A complete full-stack application for managing mini loans and calculating EMIs (Equated Monthly Installments) with user authentication, admin approval workflow, and payment tracking.

## 🚀 Quick Start

### Prerequisites
- **Java 17+** (Required)
- **Node.js 18+** and npm 9+
- **Git**

### Option 1: Automated Setup (Recommended)
```bash
cd /workspaces/MiniLoan-And-EmiCalculator
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

**Terminal 1 - Backend:**
```bash
cd MiniLoanAndEMICalculator_Backend
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
./mvnw clean package -DskipTests
./mvnw spring-boot:run
# Backend runs on http://localhost:8080
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm install          # First time only
npm start
# Frontend runs on http://localhost:3000
```

### Option 3: Docker Compose
```bash
docker-compose up --build
```

The H2 database will auto-create on startup.

---

## 📋 Features

### User Features
- ✅ User Registration with Aadhaar & PAN validation
- ✅ Email-based Password Delivery & Reset
- ✅ User Dashboard with current loan status
- ✅ Apply for Loans (₹1,000 - ₹50,000)
- ✅ EMI Calculator with variable interest rates
- ✅ Monthly EMI Payment Processing
- ✅ Full Loan Closure Option
- ✅ Loan History & Payment Tracking
- ✅ Profile Management & Password Change

### Admin Features
- ✅ Admin Dashboard with pending loans
- ✅ Loan Approval/Rejection
- ✅ User Management
- ✅ View Loan Analytics

### System Features
- ✅ JWT-based Authentication (24-hour tokens)
- ✅ Role-based Access Control (USER/ADMIN)
- ✅ Protected Routes & Endpoints
- ✅ SQLite Database with Auto-Migration
- ✅ Email Service Integration
- ✅ Input Validation (Frontend & Backend)
- ✅ Error Handling & Logging
- ✅ CORS Configuration

---

## 🏗️ Architecture

### Backend Stack
- **Framework:** Spring Boot 3.5.8
- **Security:** Spring Security + JWT (JJWT)
- **Database:** SQLite + Spring Data JPA
- **Email:** Spring Mail (JavaMailSender)
- **Password:** BCrypt Encryption

**Components:**
- 5 REST Controllers (Auth, User, Loan, Admin, EMI)
- 3+ Services (User, Loan, Email)
- 3 JPA Entities (User, Loan, Payment)
- 3 Repositories with custom queries
- 9 DTOs for request/response
- EMI Calculator Utility
- JWT Utilities & Filters
- Security Configuration

### Frontend Stack
- **Framework:** React 18.2.0
- **Routing:** React Router 6.20.0
- **HTTP:** Axios 1.13.2
- **Styling:** CSS3
- **Storage:** localStorage (JWT tokens)

**Components:**
- 11 Pages (Home, Login, Register, Dashboard, ApplyLoan, Profile, LoanHistory, Admin, Calculator, Contact, ResetPassword)
- 3 Shared Components (Navbar, Footer, ProtectedRoute)
- API Service Layer (api.js)
- Protected Routing System
- EMI Calculator Functions

### Database Schema

**Users Table:**
```
- id (Long) - Primary Key
- name (String)
- email (String) - Unique
- password (String) - BCrypt encoded
- aadhaarNumber (String) - 12 digits, Unique
- panNumber (String) - Pattern: [A-Z]{5}[0-9]{4}[A-Z]{1}, Unique
- occupation (String)
- monthlyIncome (Double)
- role (Enum: ROLE_USER, ROLE_ADMIN)
- createdAt, updatedAt (LocalDateTime)
```

**Loans Table:**
```
- id (Long) - Primary Key
- userId (Long) - Foreign Key
- loanAmount (Double) - ₹1,000 to ₹50,000
- interestRate (Double) - 8%-15% p.a. (based on income)
- tenure (Integer) - 1-24 months
- emi (Double) - Calculated & Rounded
- totalPayable (Double)
- paidAmount (Double) - Default: 0
- remainingAmount (Double)
- status (Enum: PENDING, APPROVED, REJECTED, COMPLETED)
- startDate, endDate (LocalDate)
- createdAt, updatedAt (LocalDateTime)
```

**Payments Table:**
```
- id (Long) - Primary Key
- loanId (Long) - Foreign Key
- amountPaid (Double)
- paymentDate (LocalDate)
- paymentType (Enum: EMI, FULL)
- timestamp (LocalDateTime)
```

---

## 🔐 Authentication & Security

### JWT Implementation
- **Algorithm:** HMAC-SHA512
- **Expiry:** 24 hours (86400000ms)
- **Storage:** localStorage on frontend, verified via JwtRequestFilter on backend
- **Header:** `Authorization: Bearer <token>`

### Password Security
- **Encoding:** BCrypt (Spring Security default)
- **Validation:** Min 6 characters
- **Reset:** Random 12-character password, sent via email

### Role-based Access
```
Public Routes:
  /api/auth/register - User Registration
  /api/auth/login - User Login
  /api/auth/reset-password - Password Reset
  /api/auth/logout - Logout

User Routes (/api/user/*, /api/loan/*):
  Requires: ROLE_USER
  
Admin Routes (/api/admin/*):
  Requires: ROLE_ADMIN
```

---

## 📱 API Endpoints

### Authentication
```
POST   /api/auth/register             - Register new user
POST   /api/auth/login                - Login user
POST   /api/auth/reset-password       - Reset password via email
POST   /api/auth/logout               - Logout user
```

### User Management (Protected)
```
GET    /api/user/profile              - Get user profile
PUT    /api/user/update-profile       - Update profile (occupation, income)
PUT    /api/user/change-password      - Change password
```

### Loan Management (Protected)
```
POST   /api/loan/apply                - Apply for loan
GET    /api/loan/current              - Get current active loan
GET    /api/loan/history              - Get all loans
POST   /api/loan/pay                  - Pay EMI/Full amount
GET    /api/loan/payments/{id}        - Get loan payments
```

### Admin Management (Protected)
```
GET    /api/admin/loans/pending       - Get pending loan approvals
POST   /api/admin/loan/approve/{id}   - Approve loan
POST   /api/admin/loan/reject/{id}    - Reject loan
GET    /api/admin/users               - Get all users
```

---

## ✅ Validation Rules

### User Registration
- **Aadhaar:** 12 numeric digits (e.g., `123456789012`)
- **PAN:** 5 letters + 4 digits + 1 letter (e.g., `ABCDE1234F`)
- **Email:** Valid email format, must be unique
- **Password:** Minimum 6 characters
- **Monthly Income:** Required, used for interest rate calculation

### Loan Application
- **Loan Amount:** ₹1,000 to ₹50,000
- **Tenure:** 1 to 24 months
- **Restriction:** Only 1 active loan per user

### Interest Rates (Annual Percentage)
```
Monthly Income < ₹20,000     → 15% p.a.
₹20,000 - ₹50,000           → 12% p.a.
₹50,000 - ₹100,000          → 10% p.a.
> ₹100,000                  → 8% p.a.
```

---

## 📊 EMI Calculation

### Formula
```
EMI = P × R × (1+R)^N / ((1+R)^N - 1)

Where:
- P = Principal (Loan Amount)
- R = Monthly Interest Rate (Annual Rate / 12 / 100)
- N = Number of Months (Tenure)
```

### Example
```
Loan Amount: ₹10,000
Annual Interest: 12%
Tenure: 12 months

Monthly Rate = 12 / 12 / 100 = 0.01
EMI = 10000 × 0.01 × (1.01)^12 / ((1.01)^12 - 1)
EMI ≈ ₹888.49

Total Payable: ₹10,661.88
Total Interest: ₹661.88
```

---

## ⚙️ Configuration

### Environment Variables

**Backend (.env)** - Create in `MiniLoanAndEMICalculator_Backend/`
```properties
APP_NAME=Mini Loan And EMI Calculator
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=86400000

# Mail Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_FROM=noreply@miniloan.com

# Database
SPRING_DATASOURCE_URL=jdbc:sqlite:miniloan.db
SPRING_JPA_HIBERNATE_DDL_AUTO=update
```

**Frontend (.env)** - Create in `Frontend/`
```
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_TOKEN_KEY=miniloan_token
REACT_APP_USER_ID_KEY=miniloan_user_id
REACT_APP_USER_ROLE_KEY=miniloan_user_role
```

### Application Properties
Backend uses `application.properties` with:
- SQLite JDBC connection
- Hibernate auto-migration
- JWT configuration
- Mail server settings
- CORS allowed origins

---

## 🔧 Setup & Installation

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd MiniLoanAndEMICalculator_Backend
   ```

2. Create `.env` file with configuration (see above)

3. Install dependencies (Maven):
   ```bash
   mvn clean install
   ```

4. Start the server:
   ```bash
   mvn spring-boot:run
   ```

Server will start on `http://localhost:8080`

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd Frontend
   ```

2. Create `.env` file with configuration (see above)

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

Application will open on `http://localhost:3000`

---

## 🧪 Testing the Application

### User Flow Test
1. **Register:** Go to /register, fill form with valid Aadhaar (12 digits) & PAN
2. **Email Password:** Check email for delivered password
3. **Login:** Use email and received password
4. **Dashboard:** View current loan status (none initially)
5. **Apply Loan:** Go to /apply, select amount & tenure, see EMI calculation
6. **View History:** Check /history to see applied loan

### Admin Flow Test
1. Register with regular user account
2. Manually update role to `ROLE_ADMIN` in database
3. Login with admin account
4. Access /admin to see pending loans
5. Approve/Reject loans from dashboard

### EMI Calculator Test
1. Go to /calculator
2. Enter loan amount, tenure, and select income bracket
3. See calculated EMI, total payable, and interest

---

## 📁 Project Structure

```
MiniLoan-And-EmiCalculator/
├── Frontend/                          # React Application
│   ├── public/
│   ├── src/
│   │   ├── components/               # Reusable components
│   │   ├── pages/                    # Page components
│   │   ├── App.js                    # Main app with routing
│   │   ├── index.js
│   │   └── api.js                    # API service layer
│   ├── package.json
│   └── .env                          # Frontend configuration
│
├── MiniLoanAndEMICalculator_Backend/  # Spring Boot Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/MiniLoanAndEMICalculator_Backend/
│   │   │   │       ├── controller/   # REST endpoints
│   │   │   │       ├── service/      # Business logic
│   │   │   │       ├── entity/       # JPA entities
│   │   │   │       ├── repository/   # Data access
│   │   │   │       ├── dto/          # Request/Response DTOs
│   │   │   │       ├── security/     # JWT & Security
│   │   │   │       ├── config/       # Configuration
│   │   │   │       └── util/         # Utilities
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml                       # Maven dependencies
│   ├── mvnw, mvnw.cmd               # Maven wrapper
│   ├── .env                          # Backend configuration
│   └── miniloan.db                   # SQLite database (auto-created)
│
└── README.md                         # This file
```

---

## � API Examples (cURL)

### Register User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123",
    "occupation": "Engineer",
    "monthlyIncome": 50000,
    "aadhaarNumber": "123456789012",
    "panNumber": "ABCDE1234F"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

### Calculate EMI
```bash
curl -X POST http://localhost:8080/api/emi/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 25000,
    "months": 12
  }'
```

### Apply for Loan (Requires Bearer Token)
```bash
TOKEN="your-jwt-token-from-login"
curl -X POST http://localhost:8080/api/loan/apply \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "loanAmount": 25000,
    "tenure": 12
  }'
```

### Get Current Loan
```bash
TOKEN="your-jwt-token-from-login"
curl -X GET http://localhost:8080/api/loan/current \
  -H "Authorization: Bearer $TOKEN"
```

### Admin: Get Pending Loans
```bash
TOKEN="admin-jwt-token-from-login"
curl -X GET http://localhost:8080/api/admin/loans/pending \
  -H "Authorization: Bearer $TOKEN"
```

### Admin: Approve Loan
```bash
TOKEN="admin-jwt-token-from-login"
LOAN_ID=1
curl -X POST http://localhost:8080/api/admin/loan/approve/$LOAN_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

---

## 🚨 Troubleshooting Guide

### Backend Issues

**Java Version Error - "release version 17 not supported"**
```bash
# Solution: Set Java 17 as active
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
java -version  # Verify Java 17
./mvnw clean compile -DskipTests
```

**Port 8080 Already in Use**
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9

# OR change port in application.properties
echo "server.port=8081" >> src/main/resources/application.properties
```

**Database not found/tables not created**
- Verify `spring.jpa.hibernate.ddl-auto=create-drop` in `application.properties`
- Check `spring.h2.console.enabled=true`
- Restart backend - H2 tables auto-create on startup

**CORS Error from Frontend**
```
Error: Access to XMLHttpRequest blocked by CORS policy
```
Solution: Check `application.properties` has:
```properties
app.cors.allowed-origins=http://localhost:3000
```

**JWT Token Validation Failed**
- Verify JWT secret is set in `application.properties`: `app.jwt.secret=...`
- Check token expiration: `app.jwt.expiration=86400000` (24 hours)

**Maven Build Failure**
```bash
# Clear Maven cache and rebuild
rm -rf ~/.m2/repository
./mvnw clean package -DskipTests
```

### Frontend Issues

**npm: command not found**
- Install Node.js first (v18+)
- Then run `npm install`

**Port 3000 Already in Use**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# OR use different port
PORT=3001 npm start
```

**API Connection Failed - "Network Error"**
1. Verify backend is running: `curl http://localhost:8080/api/auth/login`
2. Check `.env` has: `REACT_APP_API_BASE_URL=http://localhost:8080/api`
3. Restart frontend: `npm start`

**Login Token Not Persisting**
- Open DevTools (F12) → Application → Local Storage
- Verify `jwt_token` key exists
- Clear browser cache and login again

**npm Dependencies Installation Failed**
```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Database Issues

**H2 Console Not Accessible**
- Ensure `spring.h2.console.enabled=true` in `application.properties`
- Restart backend
- Default: Username `sa`, Password (blank)

**Database Tables Not Initializing**
- Verify entity classes have `@Entity` annotation
- Check `spring.jpa.hibernate.ddl-auto=create-drop`
- Restart backend to auto-create tables

**Need to Reset Database**
```bash
# For H2 in-memory, simply restart backend
# To persist data: spring.datasource.url=jdbc:h2:file:./data/miniloandb
```

### Authentication Issues

**"Invalid Credentials" on Login**
1. Access H2 console: `http://localhost:8080/h2-console`
2. Query: `SELECT * FROM USERS;` to verify user exists
3. Register a new user if needed

**Email Not Sending for Password Reset**
- Update `application.properties` with SMTP credentials
- Use Gmail App Password, not regular password

### Docker Issues

**Docker Build Fails**
```bash
docker-compose build --no-cache
docker-compose logs  # Check errors
```

### GitHub Codespaces

**Cannot Access Backend in Codespaces**
- Use Codespaces public URL: `https://zany-waffle-rqqvrj5jjgv2pq4v-8080.app.github.dev/api`
- Restart frontend after updating `.env`

---

### Backend Issues

**Port 8080 already in use:**
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9
# Then restart
mvn spring-boot:run
```

**Database not found:**
- SQLite will auto-create `miniloan.db` on first run
- Check `application.properties` has correct JDBC URL

**Email not sending:**
- Verify SMTP credentials in `.env`
- For Gmail, use App Password, not regular password
- Check firewall/network settings

### Frontend Issues

**npm: command not found**
```bash
# Install Node.js first
# Then run npm install
npm install
```

**Port 3000 already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or specify different port
PORT=3001 npm start
```

**API connection errors:**
- Verify backend is running on http://localhost:8080
- Check `.env` has correct `REACT_APP_API_URL`
- Check CORS configuration in backend SecurityConfig

### Database Issues

**SQLite file permissions:**
```bash
# Ensure database file is writable
chmod 666 miniloan.db
```

**Need to reset database:**
```bash
# Delete the database file to reset (backend will recreate)
rm miniloan.db
# Restart backend
mvn spring-boot:run
```

---

## 📦 Dependencies

### Backend
```xml
<!-- Spring Boot -->
<version>3.5.8</version>

<!-- Key Dependencies -->
- Spring Security: Role-based access control
- Spring Data JPA: Database ORM
- SQLite JDBC: Database driver
- JJWT: JWT token generation/validation
- BCrypt: Password encryption
- Spring Mail: Email service
- Lombok: Boilerplate reduction
```

### Frontend
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.13.2"
}
```

---

## 🔄 Workflow

### User Registration & Onboarding
1. User fills registration form with personal & financial details
2. System validates Aadhaar (12 digits) and PAN format
3. Password hashed with BCrypt
4. Random password generated and sent via email
5. User confirms receipt by logging in

### Loan Application
1. User applies for loan with amount & tenure
2. System checks: one active loan restriction, valid amount range
3. EMI calculated based on income tier
4. Loan status set to PENDING
5. Admin notified of new application

### Admin Approval
1. Admin views pending loans on dashboard
2. Can approve or reject each loan
3. On approval: status → APPROVED, start date set
4. Notifications sent to user

### EMI Payment
1. User can pay monthly EMI or full amount
2. System validates amount against remaining
3. Payment recorded with date
4. Remaining amount updated
5. Loan marked COMPLETED when paid off

---

## 🛡️ Security Best Practices

- ✅ Passwords never stored in plain text (BCrypt)
- ✅ JWT tokens with 24-hour expiry
- ✅ All sensitive endpoints protected with authentication
- ✅ Role-based access control enforced
- ✅ CORS configured for allowed origins only
- ✅ Input validation on frontend and backend
- ✅ SQL injection prevention via parameterized queries (JPA)
- ✅ CSRF protection enabled
- ✅ Sensitive data (email, Aadhaar) validated

---

## 📞 Support & Contact

For issues or questions:
1. Check the troubleshooting section above
2. Review log output from backend/frontend
3. Verify all configuration files are properly set
4. Check database permissions

---

## 📄 License

This project is provided as-is for educational and commercial use.

---

## ✨ Version

**Current Version:** 1.0.0 (Production Ready)

**Last Updated:** January 2026

---

## 🎯 Next Steps / Future Enhancements

- Payment gateway integration (Razorpay/Stripe)
- Loan prepayment with penalty calculation
- SMS notifications for payments
- Advanced admin analytics
- Document upload (Aadhaar, PAN verification)
- Mobile app (React Native)
- Email notifications for all events
- Dashboard charts and statistics
- Loan recommendation engine
- Auto-EMI payment scheduling

---

**Happy Lending! 🎉**
