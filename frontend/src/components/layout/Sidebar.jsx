import { NavLink } from "react-router-dom";
import { 
  FiGrid,
  FiUsers, 
  FiBriefcase, 
  FiCalendar, 
  FiClock, 
  FiDollarSign, 
  FiCalendar as FiCalendarIcon,
  FiSettings,
  FiLogOut,
  FiChevronRight
} from "react-icons/fi";

function Sidebar({ collapsed, expanded, mobileOpen, onCloseMobile }) {
  const menuItems = [
    { path: "/dashboard", icon: FiGrid, label: "Dashboard" },
    { path: "/employees", icon: FiUsers, label: "Employees" },
    { path: "/departments", icon: FiBriefcase, label: "Departments" },
    { path: "/leave", icon: FiCalendar, label: "Leave" },
    { path: "/attendance", icon: FiClock, label: "Attendance" },
    { path: "/payroll", icon: FiDollarSign, label: "Payroll" },
    { path: "/calendar", icon: FiCalendarIcon, label: "Calendar" },
    { path: "/settings", icon: FiSettings, label: "Settings" },
  ];

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logout clicked");
  };

  const handleMenuClick = () => {
    if (mobileOpen) {
      onCloseMobile();
    }
  };

  // Determine if sidebar is in collapsed state (either collapsed prop or tablet not expanded)
  const isCollapsed = collapsed || (!mobileOpen && !expanded);

  return (
    <aside 
      className={`main-sidebar ${collapsed ? 'collapsed' : ''} ${expanded ? 'expanded' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
    >
      <div className="sidebar-header">
        <div className="sidebar-logo">L</div>
        <span className="sidebar-logo-text">Levora</span>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `sidebar-menu-item ${isActive ? 'active' : ''}`
            }
            onClick={handleMenuClick}
          >
            <item.icon className="sidebar-menu-icon" />
            <span className="sidebar-menu-text">{item.label}</span>
            {!isCollapsed && <FiChevronRight className="sidebar-menu-arrow" />}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={handleLogout}>
          <FiLogOut className="sidebar-menu-icon" />
          <span className="sidebar-menu-text">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
