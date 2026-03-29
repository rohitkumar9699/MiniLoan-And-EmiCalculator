# Mini Loan & EMI Calculator

**Get instant EMI calculations for your mini loan needs. Transparent, fast, and completely free.**

---

## 🎯 What We Offer

A complete **loan management platform** that lets you:
- Calculate EMI instantly with transparent interest rates
- Apply for loans with real-time calculations
- Make flexible payments (EMI, custom amount, or full balance)
- Track your loan history and payment progress
- Manage your profile securely

---

## ✨ Why Choose Our Calculator?

| Feature | Description |
|---------|-------------|
| 📈 **Variable Interest Rate** | No surprises with our monthly interest rates. Know exactly what you pay. |
| ⚡ **Instant Calculation** | Get your EMI breakdown instantly. No waiting, no hidden fees. |
| 🔒 **Secure & Transparent** | Your data is secure. All calculations are transparent and verifiable. |
| 🎯 **Clear Limits** | Loan amounts from ₹1,000 to ₹50,000 with flexible tenure of 1-24 months. |
| 👤 **Role-Based Access** | Separate user and admin portals for complete loan management. |
| 📱 **Mobile-First Design** | Fully responsive on all devices - mobile, tablet, desktop. |

---

## 📋 Loan Eligibility & Rules

| Criteria | Details |
|----------|---------|
| 💰 **Loan Amount** | ₹1,000 – ₹50,000 |
| 📅 **Loan Duration** | 1 – 24 months |
| 📊 **Interest Rate** | Variable (per month) |
| ✅ **Processing** | Instant calculation & application |
| 🎟️ **Documentation** | Email, Aadhaar (12 digits), PAN (10 characters) |

---

## 🚀 Quick Start

### For Users

1. **Register** - Sign up with email and password
2. **Apply for Loan** - Use the calculator to get EMI details
3. **Submit Application** - Wait for admin approval
4. **Make Payments** - Pay your EMI flexibly
5. **Track Progress** - View loan history and payment status

### For Admins

1. **Register as Admin** - Create admin account with verified credentials
2. **View Applications** - See all pending loan applications
3. **Approve/Reject** - Make decisions instantly
4. **Track Loans** - Monitor all active and completed loans

---

## 🎨 Key Features

✅ Real-time EMI Calculator  
✅ Secure User Authentication  
✅ Role-Based Access (User & Admin)  
✅ Payment Management System  
✅ Loan History Tracking  
✅ Profile Management  
✅ Mobile-First Responsive Design  
✅ Production-Grade Security  
✅ Smooth Animations & Modern UI  
✅ Form Validation with Error Handling  

---

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.js / Navbar.css
│   │   ├── Footer.js / Footer.css
│   │   └── ProtectedRoute.js
│   ├── pages/
│   │   ├── Home.js / Home.css
│   │   ├── ApplyLoan.js / ApplyLoan.css
│   │   ├── Calculator.js / Calculator.css
│   │   ├── Dashboard.js / Dashboard.css
│   │   ├── Payment.js / Payment.css
│   │   ├── Profile.js / Profile.css
│   │   ├── LoanHistory.js / LoanHistory.css
│   │   ├── Auth.css
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Admin.js
│   │   ├── AdminRegister.js
│   │   └── ResetPassword.js
│   ├── services/
│   │   └── api.js
│   ├── App.js / App.css
│   └── index.js / index.css
├── public/
│   └── index.html
├── package.json
└── README.md
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js v14+
- npm or yarn

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   Opens at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 🔐 Authentication & Security

- **User Login/Registration** - Secure email & password authentication
- **Admin Account** - Requires Aadhaar & PAN verification
- **JWT Tokens** - Secure token-based session management
- **Protected Routes** - Route guards prevent unauthorized access
- **Data Validation** - Frontend & backend validation of all inputs

---

## 💳 Payment Options

| Option | Description |
|--------|-------------|
| **Monthly EMI** | Pay your regular EMI amount each month |
| **Custom Amount** | Pay any amount up to your remaining balance |
| **Full Balance** | Close the loan by paying full remaining amount |

---

## 📊 Dashboard Features

### User Dashboard
- Active loan status and details
- Payment progress bar
- Monthly EMI amount
- Total paid vs remaining balance
- Quick action buttons

### Admin Dashboard
- All loan applications list
- Application status (pending, approved, rejected)
- Approval/rejection controls
- Loan tracking and statistics

---

## 🎨 Design System

- **Production-Grade CSS** with 50+ design tokens
- **Mobile-First Responsive** - Optimized for 480px, 768px, 1024px, 1200px+
- **Accessibility Features** - Keyboard navigation, focus states, reduced-motion support
- **Color Scheme** - Blue for actions, Red for logout, Green for success
- **Animations** - Smooth transitions and effects throughout

---

## 🔧 Technologies Used

- **React.js 18** - Frontend framework
- **React Router v6** - Navigation
- **CSS3** - Styling with custom properties
- **Axios** - API communication
- **localStorage** - Secure token storage

---

## 🚀 Ready to Calculate Your EMI?

Get instant results with our easy-to-use calculator.

**[Register Now](#)** | **[Login](#)** | **[Calculate EMI](#)**

---

**Version:** 1.0.0  
**Last Updated:** March 30, 2026  
**Status:** Production Ready ✅
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