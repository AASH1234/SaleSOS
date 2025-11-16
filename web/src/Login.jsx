import { useState } from 'react'
import './Login.css'
import { getToken } from './api'

// Icons as SVG components for better quality
const AnalyticsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 20V10M18 20V4M6 20v-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const TeamIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const CustomerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

function Login({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeFeature, setActiveFeature] = useState(null)
  const [rememberMe, setRememberMe] = useState(false)
  const [emailValid, setEmailValid] = useState(null)
  const [passwordValid, setPasswordValid] = useState(null)

  // Validate email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  // Handle email change with validation
  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    if (value) {
      setEmailValid(validateEmail(value))
    } else {
      setEmailValid(null)
    }
  }

  // Handle password change with validation
  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
    if (value) {
      setPasswordValid(value.length >= 6)
    } else {
      setPasswordValid(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }
    if (!emailValid) {
      setError('Please enter a valid email address')
      return
    }
    if (!passwordValid) {
      setError('Password must be at least 6 characters')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      const response = await getToken({ email, password })
      if (response.success) {
        console.log('Token:', response.token)
        // Navigate to dashboard on successful login
        if (onNavigate) {
          onNavigate('dashboard')
        }
      } else {
        setError(response.message || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred while logging in')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

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
          <svg className="promo-pattern" width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <radialGradient id="bubble-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="rgba(96, 165, 250, 0.2)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
              </radialGradient>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Background Pattern */}
            <path className="wave-1" d="M-100,200 C150,100 350,0 500,100 C650,200 750,100 900,200" fill="none" stroke="url(#wave-gradient)" strokeWidth="2" />
            <path className="wave-2" d="M-100,400 C150,300 350,200 500,300 C650,400 750,300 900,400" fill="none" stroke="url(#wave-gradient)" strokeWidth="2" />
          </svg>

          {/* Large Bubbles */}
          <div className="bubble bubble-1"></div>
          <div className="bubble bubble-2"></div>
          <div className="bubble bubble-3"></div>
          <div className="bubble bubble-4"></div>
          <div className="bubble bubble-5"></div>
          <div className="bubble bubble-6"></div>
          <div className="bubble bubble-7"></div>
          <div className="bubble bubble-8"></div>
          <div className="bubble bubble-9"></div>
          <div className="bubble bubble-10"></div>

          {/* Medium Bubbles */}
          <div className="bubble bubble-m1"></div>
          <div className="bubble bubble-m2"></div>
          <div className="bubble bubble-m3"></div>
          <div className="bubble bubble-m4"></div>
          <div className="bubble bubble-m5"></div>
          <div className="bubble bubble-m6"></div>
          <div className="bubble bubble-m7"></div>
          <div className="bubble bubble-m8"></div>

          {/* Small Bubbles */}
          <div className="bubble bubble-s1"></div>
          <div className="bubble bubble-s2"></div>
          <div className="bubble bubble-s3"></div>
          <div className="bubble bubble-s4"></div>
          <div className="bubble bubble-s5"></div>
          <div className="bubble bubble-s6"></div>
          <div className="bubble bubble-s7"></div>
          <div className="bubble bubble-s8"></div>
          <div className="bubble bubble-s9"></div>
          <div className="bubble bubble-s10"></div>

          {/* Glowing Orbs */}
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
          <div className="orb orb-4"></div>

          {/* Shimmer Effects */}
          <div className="shimmer shimmer-1"></div>
          <div className="shimmer shimmer-2"></div>
          <div className="shimmer shimmer-3"></div>
        </div>
        <div className="brand-header">
          <div className="logo">
            <span className="logo-text">SaleSOS</span>
          </div>
        </div>
        <div className="hero-content">
          <h1>
            <span className="gradient-text">Welcome to</span>
            <br />
            <span className="gradient-text">The Future of Sales</span>
          </h1>
          <p className="hero-subtitle">Transform your sales process with AI-powered insights and seamless collaboration tools</p>
        </div>
        <div className="promotion-features">
          <div
            className={`feature ${activeFeature === 'analytics' ? 'active' : ''}`}
            onMouseEnter={() => setActiveFeature('analytics')}
            onMouseLeave={() => setActiveFeature(null)}
          >
            <div className="feature-icon">
              <AnalyticsIcon />
            </div>
            <div className="feature-content">
              <h3>Smart Analytics</h3>
              <p>Real-time insights and predictive analysis for data-driven decisions</p>
            </div>
          </div>
          <div
            className={`feature ${activeFeature === 'team' ? 'active' : ''}`}
            onMouseEnter={() => setActiveFeature('team')}
            onMouseLeave={() => setActiveFeature(null)}
          >
            <div className="feature-icon">
              <TeamIcon />
            </div>
            <div className="feature-content">
              <h3>Team Collaboration</h3>
              <p>Unified workspace for seamless team coordination and communication</p>
            </div>
          </div>
          <div
            className={`feature ${activeFeature === 'customer' ? 'active' : ''}`}
            onMouseEnter={() => setActiveFeature('customer')}
            onMouseLeave={() => setActiveFeature(null)}
          >
            <div className="feature-icon">
              <CustomerIcon />
            </div>
            <div className="feature-content">
              <h3>Customer Management</h3>
              <p>360° view of customer interactions and relationship tracking</p>
            </div>
          </div>
        </div>
      </div>
      <div className="login-container">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p className="login-subtitle">Sign in to your account</p>
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

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className={`input-wrapper ${passwordValid === true ? 'valid' : passwordValid === false ? 'invalid' : ''}`}>
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              {passwordValid !== null && (
                <svg className="input-status" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  {passwordValid ? (
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  ) : (
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  )}
                </svg>
              )}
            </div>
          </div>

          <div className="form-footer">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button
              type="button"
              className="forgot-password"
              onClick={() => onNavigate && onNavigate('forgot')}
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className={`btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
            <span>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </span>
            {!isLoading && (
              <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </button>

          <div className="social-login">
            <div className="divider">
              <span>OR</span>
            </div>
            <button type="button" className="social-btn google">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" fill="currentColor" />
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="auth-footer">
            <span>Don't have an account?</span>
            <button
              type="button"
              className="link"
              onClick={() => onNavigate && onNavigate('signup')}
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
