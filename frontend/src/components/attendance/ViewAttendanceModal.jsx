import { useState, useEffect } from "react";
import { FiX, FiCalendar, FiUser, FiClock, FiBriefcase, FiLogIn, FiLogOut } from "react-icons/fi";
import "../../styles/view-attendance-modal.css";

function ViewAttendanceModal({ isOpen, onClose, attendanceRecord }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const getStatusBadge = (status) => {
    const statusClasses = {
      Present: "status-present",
      Absent: "status-absent",
      Late: "status-late",
      "Half Day": "status-half-day",
    };
    return statusClasses[status] || "";
  };

  const getAvatarColor = (name) => {
    const colors = ["#3b82f6", "#10b981", "#F4C542", "#8b5cf6", "#ef4444", "#f59e0b"];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (!isOpen || !attendanceRecord) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="view-attendance-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-content">
            <div
              className="employee-avatar-large"
              style={{ backgroundColor: getAvatarColor(attendanceRecord.employee) }}
            >
              {attendanceRecord.employee.charAt(0)}
            </div>
            <div className="modal-header-text">
              <h2 className="modal-title">Attendance Details</h2>
              <p className="modal-subtitle">{attendanceRecord.employeeId}</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Attendance Information Section */}
          <div className="modal-section">
            <h3 className="section-title">Attendance Information</h3>
            <div className="section-divider"></div>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Employee</span>
                <span className="info-value">{attendanceRecord.employee}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Employee ID</span>
                <span className="info-value">{attendanceRecord.employeeId}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Department</span>
                <span className="info-value">{attendanceRecord.department}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Status</span>
                <span className={`status-badge ${getStatusBadge(attendanceRecord.status)}`}>
                  {attendanceRecord.status}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Date</span>
                <span className="info-value with-icon">
                  <FiCalendar size={14} />
                  {attendanceRecord.date}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Check In</span>
                <span className="info-value with-icon">
                  <FiLogIn size={14} />
                  {attendanceRecord.checkIn}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Check Out</span>
                <span className="info-value with-icon">
                  <FiLogOut size={14} />
                  {attendanceRecord.checkOut}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Working Hours</span>
                <span className="info-value with-icon">
                  <FiClock size={14} />
                  {attendanceRecord.workingHours}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default ViewAttendanceModal;
