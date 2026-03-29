# Mini Loan & EMI Calculator

A **production-grade FinTech application** for loan management and EMI (Equated Monthly Installments) calculation with role-based authentication (User & Admin).

---

## 🎯 Overview

This React.js application provides a complete loan management system with:
- **User Registration & Login** - Secure authentication
- **Loan Application** - Apply for loans with dynamic EMI calculation
- **Payment Management** - Make EMI or custom payments
- **Admin Dashboard** - Approve/reject loan applications
- **Loan History** - Track all loan transactions
- **Payment Status** - Real-time payment progress tracking

---

## 🌟 Key Features

### 👤 For Users
- ✅ **Secure Authentication** - Email & password registration/login
- ✅ **Loan Calculator** - Real-time EMI calculation with sliders
- ✅ **Loan Application** - Specify amount (₹1,000-₹50,000) & tenure (1-24 months)
- ✅ **Payment Dashboard** - View active loan status & payment progress
- ✅ **Make Payments** - EMI, custom amount, or full balance payment options
- ✅ **Loan History** - Complete transaction history with status tracking
- ✅ **User Profile** - Manage personal info and change password

### 👨‍💼 For Admins
- ✅ **Admin Registration** - Dedicated admin account setup
- ✅ **Admin Dashboard** - View all loan applications
- ✅ **Loan Management** - Approve or reject applications
- ✅ **Status Tracking** - Monitor pending, approved, rejected, completed loans

### 🎨 Design & UX
- ✅ **Production-Grade CSS** - Design system with 50+ CSS custom properties
- ✅ **Mobile-First Responsive** - Optimized for mobile (480px), tablet (768px), desktop (1200px+)
- ✅ **Accessibility Features** - Focus-visible states, keyboard navigation, reduced-motion support
- ✅ **Smooth Animations** - Fade, slide, spin, pulse effects
- ✅ **Color System** - Blue buttons, red logout, green success, red danger
- ✅ **Professional Typography** - Inter font family with consistent hierarchy

---

## 📋 Loan Specifications

| Specification | Details |
|---|---|
| **Min Loan Amount** | ₹1,000 |
| **Max Loan Amount** | ₹50,000 |
| **Min Tenure** | 1 month |
| **Max Tenure** | 24 months |
| **Interest Rate** | Fixed 8% per annum |
| **EMI Calculation** | Dynamic backend API |
| **Payment Types** | EMI, Custom Amount, Full Balance |

---

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.js / Navbar.css          # Navigation bar
│   │   ├── Footer.js / Footer.css          # Footer component
│   │   └── ProtectedRoute.js               # Route protection
│   ├── pages/
│   │   ├── Home.js / Home.css              # Landing page
│   │   ├── Auth.css                        # Authentication styles
│   │   ├── ApplyLoan.js / ApplyLoan.css    # Loan application
│   │   ├── Calculator.js / Calculator.css  # EMI calculator
│   │   ├── Dashboard.js / Dashboard.css    # User dashboard
│   │   ├── Payment.js / Payment.css        # Payment processing
│   │   ├── Profile.js / Profile.css        # User profile
│   │   ├── LoanHistory.js / LoanHistory.css # Loan history
│   │   ├── Login.js                        # User login
│   │   ├── Register.js                     # User registration
│   │   ├── Admin.js                        # Admin dashboard
│   │   ├── AdminRegister.js                # Admin registration
│   │   └── ResetPassword.js                # Password reset
│   ├── services/
│   │   └── api.js                          # API service layer
│   ├── App.js / App.css                    # Main app component
│   ├── index.js / index.css                # Entry point & design system
│   └── Dockerfile                          # Docker configuration
├── public/
│   └── index.html                          # HTML template
├── package.json                            # Dependencies
└── README.md                               # Documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v14+ 
- **npm** or **yarn**
- Backend API running (for full functionality)

### Installation

1. **Navigate to Frontend directory**
   ```bash
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` directory.

---

## 🎨 Design System

### CSS Variables (50+ Custom Properties)

**Colors:**
- Primary: `#2563eb` (Blue)
- Danger: `#ef4444` (Red - Logout)
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Orange)

**Spacing Scale:** xs (0.25rem) → 4xl (4rem)  
**Typography:** 6 sizes (xs → 5xl) with 5 weights (400-800)  
**Animations:** fadeIn, slideDown, pulse, spin, float, scaleIn  
**Border Radius:** 6px → 9999px  
**Shadows:** sm, md, lg, xl, 2xl  
**Transitions:** 150ms, 200ms, 300ms, 500ms  

---

## 🔐 Authentication Flow

### User Registration
1. Email, password, personal details
2. Form validation (email format, password strength)
3. Backend API stores user

### User Login
1. Email & password authentication
2. JWT token stored in localStorage
3. Redirects to dashboard

### Admin Registration
1. Email, password, Aadhaar (12 digits), PAN (10 characters)
2. Special admin account setup
3. Redirects to admin login

### Protected Routes
- Uses `ProtectedRoute` component
- Validates JWT token
- Redirects unauthenticated users to login

---

## 📊 User Workflows

### Apply for Loan
1. Navigate to "Apply for Loan"
2. Use range sliders to select amount & tenure
3. View real-time EMI, total interest, total payable
4. Submit application
5. Wait for admin approval

### Make Payment
1. Go to "Payment" page
2. View active loan details & payment progress
3. Choose payment type (EMI / Custom / Full)
4. Enter amount and submit
5. Confirmation message displayed

### View Loan History
1. Navigate to "Loan History"
2. See table of all loans (responsive cards on mobile)
3. View status badges (pending, approved, rejected, completed)
4. Track payment history

---

## 🎯 Button Colors & Styling

| Button Type | Color | Usage |
|---|---|---|
| **Primary Action** | 🔵 Blue (#2563eb) | Apply Loan, Submit, Save |
| **Secondary Action** | 🔵 Blue (#2563eb) | Back, Secondary options |
| **Logout** | 🔴 Red (#ef4444) | Logout button |
| **Danger Actions** | 🔴 Red (#ef4444) | Reject, Delete |
| **Success** | 🟢 Green (#10b981) | Confirm, Complete |

---

## 📱 Responsive Breakpoints

| Breakpoint | Target | Adjustments |
|---|---|---|
| **480px** | Mobile phones | Single column, full-width buttons, reduced padding |
| **768px** | Tablets | 2-column grids become 1 column, optimized inputs |
| **1024px** | Small laptops | Reduced padding, adjusted font sizes |
| **1200px** | Desktop | Full layout with max-width container |

---

## 🔧 Environment Setup

Create `.env` file (if needed):
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

---

## 📦 Docker (Optional)

Build Docker image:
```bash
docker build -t loan-calculator-frontend .
```

Run container:
```bash
docker run -p 3000:3000 loan-calculator-frontend
```

---

## ✅ Error Handling

### Frontend Validation
- Email format validation
- Password strength (min 6 characters)
- Aadhaar format (12 digits)
- PAN format (ABCDE1234F)
- Loan amount range (₹1,000-₹50,000)
- Tenure range (1-24 months)

### User-Friendly Messages
- Clear error messages for invalid inputs
- Confirmation dialogs for critical actions
- Loading states during API calls
- Success alerts after successful operations

---

## 🛠️ Technologies Used

- **React.js 18** - UI Framework
- **React Router v6** - Client-side routing
- **CSS3** - Styling with custom properties
- **Axios** - API calls
- **localStorage** - Token persistence
- **Responsive Design** - Mobile-first approach

---

## 📝 API Endpoints Used

| Endpoint | Method | Purpose |
|---|---|---|
| `/auth/register` | POST | User registration |
| `/auth/login` | POST | User login |
| `/auth/admin-register` | POST | Admin registration |
| `/users/profile` | GET | Get user profile |
| `/users/update-profile` | PUT | Update profile |
| `/loans/apply` | POST | Apply for loan |
| `/loans/current` | GET | Get active loan |
| `/loans/history` | GET | Loan history |
| `/loans/make-payment` | POST | Make payment |
| `/admin/applications` | GET | View all applications |
| `/admin/approve` | POST | Approve loan |

---

## 🎓 Key Features Implemented

✅ Production-grade CSS with design system  
✅ Mobile-first responsive design  
✅ Role-based authentication (User & Admin)  
✅ Real-time EMI calculation  
✅ Payment history tracking  
✅ Form validation with error messages  
✅ Accessibility features (focus-visible, keyboard navigation)  
✅ Smooth animations and transitions  
✅ Error handling with user-friendly messages  
✅ Loading states and spinners  
✅ Status badges and progress tracking  

---

## 🚦 User Roles & Permissions

### 👤 User Role
- Register & login
- Apply for loans
- Make payments
- View payment history
- Manage profile
- Change password

### 👨‍💼 Admin Role
- Register as admin
- Login to admin panel
- View all loan applications
- Approve/reject applications
- Track loan status

---

## 📞 Troubleshooting

| Issue | Solution |
|---|---|
| **Page not found** | Check if routes are correct in App.js |
| **API errors** | Verify backend is running on correct port |
| **Styling not loading** | Clear browser cache, check CSS file paths |
| **Login not working** | Ensure backend returns valid JWT token |
| **Responsive issues** | Check media queries for breakpoint ranges |

---

## 📄 License

This project is part of the Mini Loan & EMI Calculator application.

---

## 👨‍💻 Development Notes

- All CSS uses custom properties for consistency
- Components are modular and reusable
- API calls centralized in `services/api.js`
- Protected routes prevent unauthorized access
- Error boundaries can be added for robustness

---

**Last Updated:** March 30, 2026  
**Version:** 1.0.0 - Production Ready