import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" required />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button onClick={toggleForm} className="toggle-button">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
