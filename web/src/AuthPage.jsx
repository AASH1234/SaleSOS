import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import './Auth.css';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <div className="auth-image-section"></div>
      <div className="auth-form-section auth-form">
        {isLogin ? (
          <Login onLogin={onLogin} switchForm={switchForm} />
        ) : (
          <Signup onLogin={onLogin} switchForm={switchForm} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;