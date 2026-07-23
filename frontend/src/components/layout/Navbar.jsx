import { FiMenu, FiSearch, FiBell, FiMessageSquare, FiChevronDown, FiX, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { useState } from "react";

function Navbar({ onMenuClick }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <nav className="main-navbar">
      <div className="navbar-left">
        <button className="navbar-hamburger" onClick={onMenuClick}>
          <FiMenu size={24} />
        </button>
        <a href="/dashboard" className="navbar-brand">Levora</a>
      </div>

      <div className={`navbar-center ${mobileSearchOpen ? 'mobile-search-open' : ''}`}>
        <div className="navbar-search">
          <FiSearch className="navbar-search-icon" />
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search employees, departments, leave requests..."
          />
          {mobileSearchOpen && (
            <button 
              className="navbar-search-close"
              onClick={() => setMobileSearchOpen(false)}
            >
              <FiX size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="navbar-right">
        <button 
          className="navbar-icon-btn navbar-mobile-search"
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
        >
          <FiSearch size={20} />
        </button>

        <button className="navbar-icon-btn">
          <FiMessageSquare size={20} />
          <span className="navbar-notification-badge"></span>
        </button>

        <button className="navbar-icon-btn">
          <FiBell size={20} />
          <span className="navbar-notification-badge"></span>
        </button>

        <div className="navbar-divider"></div>

        <div 
          className="navbar-profile"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="navbar-avatar">JD</div>
          <div className="navbar-user-info">
            <span className="navbar-username">John Doe</span>
            <span className="navbar-user-role">HR Manager</span>
          </div>
          <FiChevronDown 
            className="navbar-dropdown-toggle" 
            size={16}
            style={{ transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </div>

        {showDropdown && (
          <div className="navbar-dropdown-menu">
            <div className="navbar-dropdown-item">
              <FiUser size={18} />
              <span>My Profile</span>
            </div>
            <div className="navbar-dropdown-item">
              <FiUser size={18} />
              <span>My Account</span>
            </div>
            <div className="navbar-dropdown-item">
              <FiSettings size={18} />
              <span>Settings</span>
            </div>
            <div className="navbar-dropdown-divider"></div>
            <div className="navbar-dropdown-item navbar-dropdown-logout">
              <FiLogOut size={18} />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
