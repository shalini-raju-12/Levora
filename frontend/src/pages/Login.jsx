import { Link } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import "../styles/login.css";
import logo from "../assets/images/lemonpeek-logo.png";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = () => {
    // Google OAuth function will be called here
    console.log("Google OAuth login");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Login logic will be implemented here
    console.log("Login submitted");
  };

  return (
    <div className="login-container">
      {/* Hero Section */}
      <div className="login-hero">
        <div className="login-hero-content">
          <div className="login-logo-container">
            <img 
              src={logo}
              alt="Levora Logo"
              className="login-logo-image"
            />
          </div>
          <h1 className="login-brand-name">Levora</h1>
          <h2 className="login-hero-title">Smart Leave Management System</h2>
          <p className="login-hero-description">
            Streamline HR operations with intelligent leave management, automated approvals, and a seamless employee experience—all in one secure platform.
          </p>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="login-form-section">
        <div className="login-card">
          <div className="login-card-header">
            <h2 className="login-card-title">Welcome Back</h2>
            <p className="login-card-subtitle">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="login-form-group">
              <label className="login-form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="login-form-control"
                  placeholder="Enter your email"
                  required
                />
                <FiMail className="login-input-icon" />
              </div>
            </div>

            <div className="login-form-group">
              <label className="login-form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="login-form-control"
                  placeholder="Enter password"
                  required
                  style={{ paddingRight: '3rem' }}
                />
                <FiLock className="login-input-icon" />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="login-checkbox-group">
              <div className="login-checkbox">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="/forgot-password" className="login-forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="login-btn">
              Sign In
            </button>

            <div className="login-divider">
              <span>or continue with</span>
            </div>

            <button type="button" className="login-google-btn" onClick={handleGoogleLogin}>
              <svg viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>

            <div className="login-register-link">
              Don't have an account? <Link to="/register">Sign up</Link>
            </div>

            <div className="login-copyright">
              © 2024 Levora. All rights reserved.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
