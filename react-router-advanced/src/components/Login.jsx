import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(username, password);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = (demoUser) => {
    setUsername(demoUser);
    setPassword('password');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p>Please sign in to access your account</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="demo-accounts">
          <h3>Demo Accounts:</h3>
          <div className="demo-buttons">
            <button 
              onClick={() => handleDemoLogin('alice')}
              className="demo-button"
            >
              Login as Alice
            </button>
            <button 
              onClick={() => handleDemoLogin('bob')}
              className="demo-button"
            >
              Login as Bob
            </button>
            <button 
              onClick={() => handleDemoLogin('charlie')}
              className="demo-button"
            >
              Login as Charlie
            </button>
          </div>
        </div>
        
        <div className="login-info">
          <p><strong>Note:</strong> Any username with password "password" will work</p>
          <p>After login, you'll be redirected to your intended destination</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
