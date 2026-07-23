import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { useState } from "react";
import "../styles/login.css";
import logo from "../assets/images/lemonpeek-logo.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Password reset logic will be implemented here
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
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

      {/* Forgot Password Form Section */}
      <div className="login-form-section">
        <div className="login-card">
          <div className="login-card-header">
            <h2 className="login-card-title">Reset Password</h2>
            <p className="login-card-subtitle">Enter your registered email address and we'll send you a password reset link</p>
          </div>

          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'rgba(16, 185, 129, 0.2)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1.5rem' 
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Check Your Email</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                We've sent a password reset link to your email address.
              </p>
              <Link to="/login" className="login-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="login-form-group">
                <label className="login-form-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    className="login-form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <FiMail className="login-input-icon" />
                </div>
              </div>

              <button type="submit" className="login-btn">
                Send Reset Link
              </button>

              <div className="login-divider">
                <span>or</span>
              </div>

              <div className="login-register-link">
                <Link to="/login">Back to Login</Link>
              </div>

              <div className="login-copyright">
                © 2024 Levora. All rights reserved.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
