import { useState } from 'react'
import './Login.css' // reuse the auth styles

function Signup({ onNavigate }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !password || !confirm) {
      setError('Please fill all fields')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setError('')
    // Demo behaviour: replace with real signup call
    // eslint-disable-next-line no-alert
    alert(`Account created (demo): ${email}`)
    // Optionally navigate back to login
    onNavigate && onNavigate('login')
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Create account</h2>
        {error && <div className="error">{error}</div>}

        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          autoComplete="name"
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Choose a password"
          autoComplete="new-password"
        />

        <label htmlFor="confirm">Confirm password</label>
        <input
          id="confirm"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Repeat your password"
          autoComplete="new-password"
        />

        <button type="submit" className="btn">Create account</button>

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
  )
}

export default Signup
