import { FiX, FiEdit } from "react-icons/fi";
import { useEffect } from "react";
import "../../styles/view-employee-modal.css";

function ViewEmployeeModal({ isOpen, onClose, employee }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const getProfileColor = (name) => {
    const colors = ["#3b82f6", "#10b981", "#F4C542", "#8b5cf6", "#ef4444", "#f59e0b"];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      Active: "status-active",
      Inactive: "status-inactive",
      "On Leave": "status-on-leave",
    };
    return statusClasses[status] || "";
  };

  if (!isOpen || !employee) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="view-employee-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">Employee Details</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Profile Section */}
          <div className="profile-section">
            <div
              className="profile-avatar"
              style={{ backgroundColor: getProfileColor(employee.name) }}
            >
              {getInitials(employee.name)}
            </div>
            <div className="profile-info">
              <h3 className="profile-name">{employee.name}</h3>
              <p className="profile-id">{employee.employeeId}</p>
              <span className={`status-badge ${getStatusBadge(employee.status)}`}>
                {employee.status}
              </span>
            </div>
          </div>

          {/* Personal Information */}
          <div className="info-section">
            <h4 className="section-title">Personal Information</h4>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">First Name</span>
                <span className="info-value">{employee.firstName || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Last Name</span>
                <span className="info-value">{employee.lastName || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{employee.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone Number</span>
                <span className="info-value">{employee.phone}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Gender</span>
                <span className="info-value">{employee.gender || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Date of Birth</span>
                <span className="info-value">{employee.dateOfBirth || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div className="info-section">
            <h4 className="section-title">Work Information</h4>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Department</span>
                <span className="info-value">{employee.department}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Designation</span>
                <span className="info-value">{employee.designation}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Manager</span>
                <span className="info-value">{employee.manager || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Employment Type</span>
                <span className="info-value">{employee.employmentType || "Full Time"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Joining Date</span>
                <span className="info-value">{employee.joiningDate}</span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="info-section">
            <h4 className="section-title">Address</h4>
            <div className="info-grid">
              <div className="info-item full-width">
                <span className="info-label">Address</span>
                <span className="info-value">{employee.address || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">City</span>
                <span className="info-value">{employee.city || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">State</span>
                <span className="info-value">{employee.state || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Country</span>
                <span className="info-value">{employee.country || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">ZIP Code</span>
                <span className="info-value">{employee.zipCode || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="info-section">
            <h4 className="section-title">Account Information</h4>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Username</span>
                <span className="info-value">{employee.username || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Last Login</span>
                <span className="info-value">{employee.lastLogin || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Account Status</span>
                <span className="info-value">{employee.accountStatus || "Active"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-close" onClick={onClose}>
            Close
          </button>
          <button
            className="btn-edit"
            onClick={() => {
              console.log("Edit Employee:", employee);
            }}
          >
            <FiEdit size={16} />
            Edit Employee
          </button>
        </div>
      </div>
    </>
  );
}

export default ViewEmployeeModal;
