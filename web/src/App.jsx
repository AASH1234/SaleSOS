

import { useState } from 'react';
import Dashboard from './Signup.jsx';

function App() {
  const [page, setPage] = useState('dashboard');

  const handleNavigate = (to) => {
    if (to === 'signup') setPage('signup');
    else if (to === 'forgot') setPage('forgot');
    else if (to === 'dashboard') setPage('dashboard');
    else setPage('login');
  };

  if (page === 'signup') return <Signup onNavigate={handleNavigate} />;
  if (page === 'forgot') return <ForgotPassword onNavigate={handleNavigate} />;
  if (page === 'dashboard') return <Dashboard />;
  return <Login onNavigate={handleNavigate} onLoginSuccess={() => setPage('dashboard')} />;
}

export default App;
