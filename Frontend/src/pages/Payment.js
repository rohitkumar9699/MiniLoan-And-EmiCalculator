import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loanAPI } from '../services/api';
import './Payment.css';

function Payment() {
  const navigate = useNavigate();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentType, setPaymentType] = useState('emi'); // emi or full
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [validationError, setValidationError] = useState('');

  // Fetch current loan on mount
  useEffect(() => {
    fetchCurrentLoan();
  }, []);

  const fetchCurrentLoan = async () => {
    try {
      setLoading(true);
      const response = await loanAPI.getCurrentLoan();
      setLoan(response.data);
    } catch (err) {
      setError('No active loan found or unauthorized access');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
    setPaymentAmount('');
    setValidationError('');
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setPaymentAmount(value);
    setValidationError('');

    // Validate amount
    if (value && loan) {
      const amount = parseFloat(value);
      if (isNaN(amount) || amount <= 0) {
        setValidationError('Amount must be greater than 0');
      } else if (amount > loan.remainingAmount) {
        setValidationError(`Amount cannot exceed remaining balance (₹${loan.remainingAmount?.toFixed(2)})`);
      }
    }
  };

  const validatePayment = () => {
    if (!paymentAmount) {
      setValidationError('Please enter a payment amount');
      return false;
    }

    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      setValidationError('Amount must be greater than 0');
      return false;
    }

    if (amount > loan.remainingAmount) {
      setValidationError(`Amount cannot exceed remaining balance (₹${loan.remainingAmount?.toFixed(2)})`);
      return false;
    }

    if (paymentType === 'emi' && amount < loan.emi) {
      setValidationError(`EMI payment must be at least ₹${loan.emi?.toFixed(2)}`);
      return false;
    }

    return true;
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();

    if (!validatePayment()) return;

    setIsProcessing(true);
    try {
      await loanAPI.payEmi({
        amount: parseFloat(paymentAmount),
        loanId: loan.id,
      });

      setSuccessMessage(`Payment of ₹${parseFloat(paymentAmount).toFixed(2)} successful!`);
      setPaymentAmount('');
      
      // Refresh loan data
      setTimeout(() => {
        fetchCurrentLoan();
        setSuccessMessage('');
      }, 2000);
    } catch (err) {
      setValidationError(err.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayFull = async () => {
    if (!loan) return;

    setIsProcessing(true);
    try {
      await loanAPI.payEmi({
        amount: loan.remainingAmount,
        loanId: loan.id,
      });

      setSuccessMessage(`Full loan payment of ₹${loan.remainingAmount?.toFixed(2)} successful! Loan closed.`);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setValidationError(err.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return <div className="payment-container"><p>Loading loan details...</p></div>;
  }

  if (error) {
    return (
      <div className="payment-container">
        <div className="error-box">
          <h2>No Active Loan</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/apply')} className="btn-primary">
            Apply for a Loan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Make Payment</h2>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {validationError && <div className="error-message">{validationError}</div>}

        {loan && (
          <>
            {/* Loan Summary Section */}
            <div className="loan-summary">
              <div className="summary-header">
                <h3>Loan Details</h3>
                <span className={`status-badge ${loan.status?.toLowerCase()}`}>
                  {loan.status}
                </span>
              </div>

              <div className="summary-grid">
                <div className="summary-item">
                  <label>Loan Amount</label>
                  <p className="amount">₹{loan.loanAmount?.toLocaleString('en-IN')}</p>
                </div>
                <div className="summary-item">
                  <label>Monthly EMI</label>
                  <p className="amount">₹{loan.emi?.toFixed(2)}</p>
                </div>
                <div className="summary-item">
                  <label>Interest Rate</label>
                  <p>{loan.interestRate}% p.a.</p>
                </div>
                <div className="summary-item">
                  <label>Tenure</label>
                  <p>{loan.tenure} months</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="payment-progress">
                <label>Payment Progress</label>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${((loan.paidAmount / loan.totalPayable) * 100) || 0}%`,
                    }}
                  >
                    <span className="progress-text">
                      {Math.round((loan.paidAmount / loan.totalPayable) * 100) || 0}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="payment-details">
                <div className="detail-row">
                  <span>Total Payable:</span>
                  <strong>₹{loan.totalPayable?.toLocaleString('en-IN')}</strong>
                </div>
                <div className="detail-row">
                  <span>Already Paid:</span>
                  <strong className="paid">₹{loan.paidAmount?.toFixed(2)}</strong>
                </div>
                <div className="detail-row highlight">
                  <span>Remaining Balance:</span>
                  <strong className="remaining">₹{loan.remainingAmount?.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            {/* Payment Form Section */}
            {loan.status === 'APPROVED' && (
              <div className="payment-form-section">
                <h3>Make a Payment</h3>

                <form onSubmit={handleSubmitPayment}>
                  {/* Payment Type Selection */}
                  <div className="payment-type-selector">
                    <label>Payment Type:</label>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input
                          type="radio"
                          value="emi"
                          checked={paymentType === 'emi'}
                          onChange={handlePaymentTypeChange}
                        />
                        <span>Monthly EMI (₹{loan.emi?.toFixed(2)})</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          value="custom"
                          checked={paymentType === 'custom'}
                          onChange={handlePaymentTypeChange}
                        />
                        <span>Custom Amount</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          value="full"
                          checked={paymentType === 'full'}
                          onChange={handlePaymentTypeChange}
                        />
                        <span>Pay Full Balance (₹{loan.remainingAmount?.toFixed(2)})</span>
                      </label>
                    </div>
                  </div>

                  {/* Amount Input */}
                  {paymentType !== 'full' && (
                    <div className="form-group">
                      <label htmlFor="amount">Payment Amount (₹)</label>
                      <div className="input-with-suggestions">
                        <input
                          type="number"
                          id="amount"
                          value={paymentAmount}
                          onChange={handleAmountChange}
                          placeholder={paymentType === 'emi' ? loan.emi?.toFixed(2) : 'Enter amount'}
                          step="0.01"
                          min="0"
                          max={loan.remainingAmount}
                          className={validationError ? 'error' : ''}
                        />
                        {paymentType === 'emi' && (
                          <button
                            type="button"
                            className="suggestion-btn"
                            onClick={() => setPaymentAmount(loan.emi?.toString())}
                          >
                            Use EMI
                          </button>
                        )}
                        {paymentType === 'custom' && (
                          <button
                            type="button"
                            className="suggestion-btn"
                            onClick={() => setPaymentAmount(loan.remainingAmount?.toString())}
                          >
                            Pay All
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="button-group">
                    {paymentType === 'full' ? (
                      <button
                        type="button"
                        onClick={handlePayFull}
                        disabled={isProcessing}
                        className="btn-pay btn-full"
                      >
                        {isProcessing ? 'Processing...' : `Pay Full Balance (₹${loan.remainingAmount?.toFixed(2)})`}
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isProcessing || !paymentAmount}
                        className="btn-pay"
                      >
                        {isProcessing ? 'Processing...' : 'Submit Payment'}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard')}
                      className="btn-secondary"
                    >
                      Back to Dashboard
                    </button>
                  </div>
                </form>
              </div>
            )}

            {loan.status !== 'APPROVED' && (
              <div className="status-message">
                <p>
                  {loan.status === 'PENDING' && 'Your loan application is pending admin approval. Once approved, you can make payments.'}
                  {loan.status === 'REJECTED' && 'Your loan application was rejected. Please apply again if you wish.'}
                  {loan.status === 'COMPLETED' && 'This loan has been fully paid off. Congratulations!'}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Payment;
