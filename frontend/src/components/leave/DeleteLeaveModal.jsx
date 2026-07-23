import { useState, useEffect } from "react";
import { FiX, FiAlertTriangle } from "react-icons/fi";
import "../../styles/delete-leave-modal.css";

function DeleteLeaveModal({ isOpen, onClose, leaveRequest, onDeleteLeave }) {
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen && !isDeleting) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, isDeleting]);

  const handleDelete = () => {
    setIsDeleting(true);
    onDeleteLeave(leaveRequest.id);
  };

  if (!isOpen || !leaveRequest) return null;

  const getStatusBadge = (status) => {
    const statusClasses = {
      Pending: "status-pending",
      Approved: "status-approved",
      Rejected: "status-rejected",
    };
    return statusClasses[status] || "";
  };

  return (
    <>
      <div className="modal-overlay" onClick={() => !isDeleting && onClose()}></div>
      <div className="delete-leave-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-content">
            <div className="warning-icon-wrapper">
              <FiAlertTriangle size={32} />
            </div>
            <div>
              <h2 className="modal-title">Delete Leave Request</h2>
              <p className="modal-subtitle">Confirm leave request deletion</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={() => !isDeleting && onClose()}>
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Leave Request Details */}
          <div className="leave-details">
            <div className="detail-item">
              <span className="detail-label">Employee</span>
              <span className="detail-value">{leaveRequest.employee}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Employee ID</span>
              <span className="detail-value">{leaveRequest.employeeId}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Leave Type</span>
              <span className="detail-value">{leaveRequest.leaveType}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Leave Period</span>
              <span className="detail-value">{leaveRequest.startDate} to {leaveRequest.endDate}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Total Days</span>
              <span className="detail-value">{leaveRequest.days}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status</span>
              <span className={`status-badge ${getStatusBadge(leaveRequest.status)}`}>
                {leaveRequest.status}
              </span>
            </div>
          </div>

          {/* Warning Section */}
          <div className="warning-section">
            <div className="warning-card">
              <FiAlertTriangle className="warning-icon" size={20} />
              <div className="warning-content">
                <h4 className="warning-title">Warning</h4>
                <p className="warning-message">
                  Are you sure you want to permanently delete this leave request?
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={() => !isDeleting && onClose()} disabled={isDeleting}>
            Cancel
          </button>
          <button className="btn-delete" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Leave Request"}
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteLeaveModal;
