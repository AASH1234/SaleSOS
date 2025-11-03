import { useState } from 'react'
import './Login.css'

function Login({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }
    setError('')
    // Demo behaviour: replace with real auth call
    // eslint-disable-next-line no-alert
    alert(`Logged in (demo): ${email}`)
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Sign in</h2>
        {error && <div className="error">{error}</div>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="username"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        <button type="submit" className="btn">Sign in</button>

        <p className="muted">This is a demo login page — wire to your auth flow.</p>

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
  )
}

export default Login
