import { useState, useEffect } from "react";
import { FiX, FiMapPin, FiCalendar, FiUsers, FiBriefcase, FiEdit } from "react-icons/fi";
import "../../styles/view-department-modal.css";

function ViewDepartmentModal({ isOpen, onClose, department, onEdit }) {
  const [recentEmployees] = useState([
    {
      id: 1,
      name: "John Smith",
      employeeId: "EMP001",
      designation: "Senior Developer",
      status: "Active",
      avatar: "JS",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      employeeId: "EMP002",
      designation: "Team Lead",
      status: "Active",
      avatar: "SJ",
    },
    {
      id: 3,
      name: "Michael Chen",
      employeeId: "EMP003",
      designation: "Developer",
      status: "Active",
      avatar: "MC",
    },
    {
      id: 4,
      name: "Emily Brown",
      employeeId: "EMP004",
      designation: "Designer",
      status: "On Leave",
      avatar: "EB",
    },
    {
      id: 5,
      name: "David Wilson",
      employeeId: "EMP005",
      designation: "Developer",
      status: "Active",
      avatar: "DW",
    },
  ]);

  const performanceStats = [
    { label: "Attendance", value: "94%", color: "#10b981" },
    { label: "Leave Rate", value: "8%", color: "#3b82f6" },
    { label: "Satisfaction", value: "87%", color: "#F4C542" },
    { label: "Productivity", value: "92%", color: "#8b5cf6" },
  ];

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const getAvatarColor = (name) => {
    const colors = ["#3b82f6", "#10b981", "#F4C542", "#8b5cf6", "#ef4444", "#f59e0b"];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      Active: "status-active",
      "On Leave": "status-on-leave",
      Inactive: "status-inactive",
    };
    return statusClasses[status] || "";
  };

  if (!isOpen || !department) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="view-department-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-content">
            <div className="department-avatar-large" style={{ backgroundColor: getAvatarColor(department.name) }}>
              {department.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
            </div>
            <div className="modal-header-text">
              <h2 className="modal-title">{department.name}</h2>
              <p className="modal-subtitle">{department.code}</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Department Information Section */}
          <div className="modal-section">
            <h3 className="section-title">Department Information</h3>
            <div className="section-divider"></div>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Department Name</span>
                <span className="info-value">{department.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Department Code</span>
                <span className="info-value">{department.code}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Department Head</span>
                <span className="info-value">{department.head}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Status</span>
                <span className={`status-badge ${getStatusBadge(department.status)}`}>
                  {department.status}
                </span>
              </div>
              <div className="info-item full-width">
                <span className="info-label">Location</span>
                <span className="info-value with-icon">
                  <FiMapPin size={14} />
                  {department.location}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Created Date</span>
                <span className="info-value with-icon">
                  <FiCalendar size={14} />
                  {department.createdDate}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Last Updated</span>
                <span className="info-value with-icon">
                  <FiCalendar size={14} />
                  {new Date().toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              {department.description && (
                <div className="info-item full-width">
                  <span className="info-label">Description</span>
                  <span className="info-value description">{department.description}</span>
                </div>
              )}
            </div>
          </div>

          {/* Department Statistics Section */}
          <div className="modal-section">
            <h3 className="section-title">Department Statistics</h3>
            <div className="section-divider"></div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon-wrapper blue">
                  <FiUsers size={20} />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{department.employees}</span>
                  <span className="stat-label">Total Employees</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon-wrapper green">
                  <FiUsers size={20} />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{Math.round(department.employees * 0.55)}</span>
                  <span className="stat-label">Male Employees</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon-wrapper purple">
                  <FiUsers size={20} />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{Math.round(department.employees * 0.45)}</span>
                  <span className="stat-label">Female Employees</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon-wrapper yellow">
                  <FiBriefcase size={20} />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{Math.max(0, department.employees - 2)}</span>
                  <span className="stat-label">Open Positions</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon-wrapper orange">
                  <FiCalendar size={20} />
                </div>
                <div className="stat-content">
                  <span className="stat-value">3.5</span>
                  <span className="stat-label">Avg Experience (Years)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Employees Section */}
          <div className="modal-section">
            <h3 className="section-title">Recent Employees</h3>
            <div className="section-divider"></div>
            <div className="employees-list">
              {recentEmployees.map((employee) => (
                <div key={employee.id} className="employee-item">
                  <div
                    className="employee-avatar"
                    style={{ backgroundColor: getAvatarColor(employee.name) }}
                  >
                    {employee.avatar}
                  </div>
                  <div className="employee-info">
                    <span className="employee-name">{employee.name}</span>
                    <span className="employee-id">{employee.employeeId}</span>
                  </div>
                  <div className="employee-details">
                    <span className="employee-designation">{employee.designation}</span>
                    <span className={`status-badge ${getStatusBadge(employee.status)}`}>
                      {employee.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Performance Section */}
          <div className="modal-section">
            <h3 className="section-title">Department Performance</h3>
            <div className="section-divider"></div>
            <div className="performance-grid">
              {performanceStats.map((stat, index) => (
                <div key={index} className="performance-card">
                  <div
                    className="performance-bar"
                    style={{
                      width: stat.value,
                      backgroundColor: stat.color,
                    }}
                  ></div>
                  <span className="performance-value">{stat.value}</span>
                  <span className="performance-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-close" onClick={onClose}>
            Close
          </button>
          <button className="btn-edit" onClick={() => onEdit(department)}>
            <FiEdit size={16} />
            Edit Department
          </button>
        </div>
      </div>
    </>
  );
}

export default ViewDepartmentModal;
