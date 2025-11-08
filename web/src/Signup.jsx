import { useState } from 'react'
import './Login.css' // reuse the auth styles

// Icons as SVG components for better quality
const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

function Signup({ onNavigate }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeFeature, setActiveFeature] = useState(null)
  const [nameValid, setNameValid] = useState(null)
  const [emailValid, setEmailValid] = useState(null)
  const [passwordValid, setPasswordValid] = useState(null)
  const [confirmValid, setConfirmValid] = useState(null)

  // Validate email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  // Handle name change with validation
  const handleNameChange = (e) => {
    const value = e.target.value
    setName(value)
    if (value) {
      setNameValid(value.length >= 2)
    } else {
      setNameValid(null)
    }
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
      if (confirm) {
        setConfirmValid(value === confirm)
      }
    } else {
      setPasswordValid(null)
    }
  }

  // Handle confirm password change with validation
  const handleConfirmChange = (e) => {
    const value = e.target.value
    setConfirm(value)
    if (value) {
      setConfirmValid(value === password)
    } else {
      setConfirmValid(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !password || !confirm) {
      setError('Please fill all fields')
      return
    }
    if (!nameValid) {
      setError('Name must be at least 2 characters')
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
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }

    setError('')
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      // eslint-disable-next-line no-alert
      alert(`Account created (demo): ${email}`)
      onNavigate && onNavigate('login')
    } catch (err) {
      setError('An error occurred. Please try again.')
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
            <span className="gradient-text">Join the Future</span>
            <br />
            <span className="gradient-text">of Sales Today</span>
          </h1>
          <p className="hero-subtitle">Start your journey with powerful tools that revolutionize your sales process</p>
        </div>
        <div className="promotion-features">
          <div 
            className={`feature ${activeFeature === 'quick' ? 'active' : ''}`}
            onMouseEnter={() => setActiveFeature('quick')}
            onMouseLeave={() => setActiveFeature(null)}
          >
            <div className="feature-icon">
              <RocketIcon />
            </div>
            <div className="feature-content">
              <h3>Quick Setup</h3>
              <p>Get started in minutes with our intuitive onboarding process</p>
            </div>
          </div>
          <div 
            className={`feature ${activeFeature === 'secure' ? 'active' : ''}`}
            onMouseEnter={() => setActiveFeature('secure')}
            onMouseLeave={() => setActiveFeature(null)}
          >
            <div className="feature-icon">
              <ShieldIcon />
            </div>
            <div className="feature-content">
              <h3>Enterprise Security</h3>
              <p>Your data is protected with industry-leading security measures</p>
            </div>
          </div>
          <div 
            className={`feature ${activeFeature === 'support' ? 'active' : ''}`}
            onMouseEnter={() => setActiveFeature('support')}
            onMouseLeave={() => setActiveFeature(null)}
          >
            <div className="feature-icon">
              <UserIcon />
            </div>
            <div className="feature-content">
              <h3>24/7 Support</h3>
              <p>Get help anytime with our dedicated support team</p>
            </div>
          </div>
        </div>
      </div>
      <div className="login-container">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-header">
            <h2>Create Account</h2>
            <p className="login-subtitle">Join thousands of sales professionals</p>
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
            <label htmlFor="name">Full name</label>
            <div className={`input-wrapper ${nameValid === true ? 'valid' : nameValid === false ? 'invalid' : ''}`}>
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                id="name"
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="John Doe"
                autoComplete="name"
              />
              {nameValid !== null && (
                <svg className="input-status" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  {nameValid ? (
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  ) : (
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  )}
                </svg>
              )}
            </div>
          </div>

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
                autoComplete="email"
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
                placeholder="Choose a password"
                autoComplete="new-password"
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

          <div className="input-group">
            <label htmlFor="confirm">Confirm password</label>
            <div className={`input-wrapper ${confirmValid === true ? 'valid' : confirmValid === false ? 'invalid' : ''}`}>
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={handleConfirmChange}
                placeholder="Repeat your password"
                autoComplete="new-password"
              />
              {confirmValid !== null && (
                <svg className="input-status" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  {confirmValid ? (
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  ) : (
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  )}
                </svg>
              )}
            </div>
          </div>

          <button type="submit" className={`btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
            <span>
              {isLoading ? 'Creating account...' : 'Create account'}
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
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" fill="currentColor"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="auth-footer">
            <span>Already have an account?</span>
            <button
              type="button"
              className="link"
              onClick={() => onNavigate && onNavigate('login')}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
