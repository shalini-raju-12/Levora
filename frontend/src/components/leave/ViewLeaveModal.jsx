import { useState, useEffect } from "react";
import { FiX, FiCalendar, FiUser, FiClock } from "react-icons/fi";
import "../../styles/view-leave-modal.css";

function ViewLeaveModal({ isOpen, onClose, leaveRequest }) {
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
      Pending: "status-pending",
      Approved: "status-approved",
      Rejected: "status-rejected",
    };
    return statusClasses[status] || "";
  };

  const getAvatarColor = (name) => {
    const colors = ["#3b82f6", "#10b981", "#F4C542", "#8b5cf6", "#ef4444", "#f59e0b"];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (!isOpen || !leaveRequest) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="view-leave-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-content">
            <div
              className="employee-avatar-large"
              style={{ backgroundColor: getAvatarColor(leaveRequest.employee) }}
            >
              {leaveRequest.employee.charAt(0)}
            </div>
            <div className="modal-header-text">
              <h2 className="modal-title">Leave Request Details</h2>
              <p className="modal-subtitle">{leaveRequest.employeeId}</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Leave Information Section */}
          <div className="modal-section">
            <h3 className="section-title">Leave Information</h3>
            <div className="section-divider"></div>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Employee</span>
                <span className="info-value">{leaveRequest.employee}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Employee ID</span>
                <span className="info-value">{leaveRequest.employeeId}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Leave Type</span>
                <span className="info-value">{leaveRequest.leaveType}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Status</span>
                <span className={`status-badge ${getStatusBadge(leaveRequest.status)}`}>
                  {leaveRequest.status}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Start Date</span>
                <span className="info-value with-icon">
                  <FiCalendar size={14} />
                  {leaveRequest.startDate}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">End Date</span>
                <span className="info-value with-icon">
                  <FiCalendar size={14} />
                  {leaveRequest.endDate}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Total Days</span>
                <span className="info-value">{leaveRequest.days}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Applied Date</span>
                <span className="info-value with-icon">
                  <FiClock size={14} />
                  {leaveRequest.appliedDate}
                </span>
              </div>
              <div className="info-item full-width">
                <span className="info-label">Reason</span>
                <span className="info-value description">{leaveRequest.reason}</span>
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

export default ViewLeaveModal;
