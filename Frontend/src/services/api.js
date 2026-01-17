import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('jwt_token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const authAPI = {
  register: (data) => axios.post(`${API_URL}/auth/register`, data),
  login: (data) => axios.post(`${API_URL}/auth/login`, data),
  resetPassword: (email) => axios.post(`${API_URL}/auth/reset-password`, { email }),
  logout: () => {
    localStorage.removeItem('jwt_token');
    return Promise.resolve();
  },
  // Admin auth endpoints
  registerAdmin: (data) => axios.post(`${API_URL}/auth/register-admin`, data),
  loginAdmin: (data) => axios.post(`${API_URL}/auth/login-admin`, data),
};

export const userAPI = {
  getProfile: () => axios.get(`${API_URL}/user/profile`, getAuthHeader()),
  updateProfile: (data) => axios.put(`${API_URL}/user/update-profile`, data, getAuthHeader()),
  changePassword: (data) => axios.put(`${API_URL}/user/change-password`, data, getAuthHeader()),
};

export const loanAPI = {
  applyLoan: (data) => axios.post(`${API_URL}/loan/apply`, data, getAuthHeader()),
  getCurrentLoan: () => axios.get(`${API_URL}/loan/current`, getAuthHeader()),
  getLoanHistory: () => axios.get(`${API_URL}/loan/history`, getAuthHeader()),
  payEmi: (data) => axios.post(`${API_URL}/loan/pay`, data, getAuthHeader()),
};

export const adminAPI = {
  getPendingLoans: () => axios.get(`${API_URL}/admin/loans/pending`, getAuthHeader()),
  approveLoan: (loanId) => axios.post(`${API_URL}/admin/loan/approve/${loanId}`, {}, getAuthHeader()),
  rejectLoan: (loanId) => axios.post(`${API_URL}/admin/loan/reject/${loanId}`, {}, getAuthHeader()),
  getAllUsers: () => axios.get(`${API_URL}/admin/users`, getAuthHeader()),
};

// EMI Calculator Utility
export const calculateEMI = (principal, annualRate, months) => {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, months);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;
  return Math.round(numerator / denominator * 100) / 100;
};

export const getInterestRate = (monthlyIncome) => {
  if (monthlyIncome < 20000) return 15.0;
  if (monthlyIncome < 50000) return 12.0;
  if (monthlyIncome < 100000) return 10.0;
  return 8.0;
};
