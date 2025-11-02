import './App.css'
import { useState } from 'react'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'

function App() {
  const [page, setPage] = useState('login')

  const handleNavigate = (to) => {
    if (to === 'signup') setPage('signup')
    else setPage('login')
  }

  return page === 'signup' ? (
    <Signup onNavigate={handleNavigate} />
  ) : (
    <Login onNavigate={handleNavigate} />
  )
}

export default App
