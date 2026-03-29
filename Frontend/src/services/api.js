import axios from 'axios';
import React, { useState, useEffect } from 'react';

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



const backend_url = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

// EMI Calculation via Backend API
export const calculateEMI = async (principal, months) => {
  try {
    // 🛑 Guard condition
    if (!principal || !months || principal <= 0 || months <= 0) {
      return {
        emi: 0,
        totalInterest: 0,
        totalAmount: 0,
        interestRate: 0,
      };
    }

    const response = await fetch(`${backend_url}/emi/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: principal,
        months: months,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to calculate EMI");
    }

    const data = await response.json();

    // ✅ Return normalized response
    return {
      emi: data.monthlyEmi,
      totalInterest: data.totalInterest,
      totalAmount: data.totalPayment,
      interestRate: data.monthlyRates,
    };
  } catch (error) {
    console.error("EMI API Error:", error);

    // fallback response
    return {
      emi: 0,
      totalInterest: 0,
      totalAmount: 0,
      interestRate: 0,
      error: error.message,
    };
  }
};