import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import "../styles/login.css";
import logo from "../assets/images/lemonpeek-logo.png";

function ForgotPassword() {
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

          <form>
            <div className="login-form-group">
              <label className="login-form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="login-form-control"
                  placeholder="Enter your email"
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
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
