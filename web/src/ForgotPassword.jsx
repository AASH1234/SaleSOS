import { useState } from 'react';
import './Login.css';

function ForgotPassword({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpValidated, setOtpValidated] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value) {
      setEmailValid(validateEmail(value));
    } else {
      setEmailValid(null);
    }
  };

  // Simulate sending OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    if (!emailValid) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      // Generate a 6-digit OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setOtp(generatedOtp);
      setOtpSent(true);
      setSubmitted(true);
      // In real app, send generatedOtp to backend to email user
      // eslint-disable-next-line no-alert
      alert(`Simulated OTP sent to ${email}: ${generatedOtp}`);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Validate OTP
  const handleOtpChange = (e) => {
    setOtpInput(e.target.value);
    setOtpError('');
  };

  const handleValidateOtp = (e) => {
    e.preventDefault();
    if (otpInput === otp) {
      setOtpValidated(true);
      setOtpError('');
    } else {
      setOtpError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="background-effects">
        <div className="gradient-sphere gradient-sphere-1"></div>
        <div className="gradient-sphere gradient-sphere-2"></div>
        <div className="gradient-sphere gradient-sphere-3"></div>
        <div className="gradient-sphere gradient-sphere-4"></div>
      </div>
      <div className="promotions-side">
        <div className="bubbles-container">
          {/* ...existing SVG and bubble structure from Login.jsx... */}
        </div>
        <div className="brand-header">
          <div className="logo">
            <span className="logo-text">SaleSOS</span>
          </div>
        </div>
        <div className="hero-content">
          <h1>
            <span className="gradient-text">Forgot Password?</span>
          </h1>
          <p className="hero-subtitle">Enter your email and we'll send you a link to reset your password.</p>
        </div>
        <div className="promotion-features">
          <div className="feature active">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20v-6M12 14l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="feature-content">
              <h3>Secure Recovery</h3>
              <p>Your account security is our top priority.</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            </div>
            <div className="feature-content">
              <h3>Fast Process</h3>
              <p>Reset your password in just a few clicks.</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 12a4 4 0 01-8 0V8a4 4 0 018 0v4z"/><rect x="6" y="16" width="12" height="2" rx="1"/></svg>
            </div>
            <div className="feature-content">
              <h3>24/7 Support</h3>
              <p>We're here to help whenever you need it.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="login-container">
        <form className="login-card" onSubmit={otpSent ? handleValidateOtp : handleSendOtp}>
          <div className="login-header">
            <h2>Reset Password</h2>
            <p className="login-subtitle">We'll send a reset link to your email</p>
          </div>
          {error && (
            <div className="error">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}
          {otpSent && !otpValidated && (
            <div className="input-group">
              <label htmlFor="otp">Enter OTP</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
                <input
                  id="otp"
                  type="text"
                  value={otpInput}
                  onChange={handleOtpChange}
                  placeholder="Enter the OTP sent to your email"
                  autoComplete="one-time-code"
                  maxLength={6}
                />
              </div>
              {otpError && <div className="error">{otpError}</div>}
            </div>
          )}
          {!otpSent && !otpValidated && (
            <div className="input-group">
              <label htmlFor="email">Email address</label>
              <div className={`input-wrapper ${emailValid === true ? 'valid' : emailValid === false ? 'invalid' : ''}`}>
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="you@example.com"
                  autoComplete="username"
                />
                {emailValid !== null && (
                  <svg className="input-status" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    {emailValid ? (
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    ) : (
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    )}
                  </svg>
                )}
              </div>
            </div>
          )}
          {otpValidated && (
            <div className="login-header">
              <h2>OTP Verified!</h2>
              <p className="login-subtitle">You may now reset your password (implement reset form here).</p>
              <button type="button" className="btn" onClick={() => onNavigate && onNavigate('login')}>Back to Sign In</button>
            </div>
          )}
          {!otpValidated && (
            <button type="submit" className={`btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
              <span>{isLoading ? (otpSent ? 'Verifying...' : 'Sending...') : (otpSent ? 'Verify OTP' : 'Send OTP')}</span>
            </button>
          )}
          <div className="auth-footer">
            <span>Remembered your password?</span>
            <button
              type="button"
              className="link"
              onClick={() => onNavigate && onNavigate('login')}
            >
              Back to Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
