import { useState, useEffect } from "react";
import { FiX, FiAlertTriangle } from "react-icons/fi";
import "../../styles/delete-attendance-modal.css";

function DeleteAttendanceModal({ isOpen, onClose, attendanceRecord, onDeleteAttendance }) {
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

  useEffect(() => {
    if (!isOpen) {
      setIsDeleting(false);
    }
  }, [isOpen]);

  const handleDelete = () => {
    setIsDeleting(true);
    onDeleteAttendance(attendanceRecord.id);
  };

  if (!isOpen || !attendanceRecord) return null;

  const getStatusBadge = (status) => {
    const statusClasses = {
      Present: "status-present",
      Absent: "status-absent",
      Late: "status-late",
      "Half Day": "status-half-day",
    };
    return statusClasses[status] || "";
  };

  return (
    <>
      <div className="modal-overlay" onClick={() => !isDeleting && onClose()}></div>
      <div className="delete-attendance-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-content">
            <div className="warning-icon-wrapper">
              <FiAlertTriangle size={32} />
            </div>
            <div>
              <h2 className="modal-title">Delete Attendance Record</h2>
              <p className="modal-subtitle">Confirm attendance record deletion</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={() => !isDeleting && onClose()}>
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Attendance Details */}
          <div className="attendance-details">
            <div className="detail-item">
              <span className="detail-label">Employee</span>
              <span className="detail-value">{attendanceRecord.employee}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Employee ID</span>
              <span className="detail-value">{attendanceRecord.employeeId}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Department</span>
              <span className="detail-value">{attendanceRecord.department}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Date</span>
              <span className="detail-value">{attendanceRecord.date}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Check In</span>
              <span className="detail-value">{attendanceRecord.checkIn}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Check Out</span>
              <span className="detail-value">{attendanceRecord.checkOut}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status</span>
              <span className={`status-badge ${getStatusBadge(attendanceRecord.status)}`}>
                {attendanceRecord.status}
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
                  Are you sure you want to permanently delete this attendance record?
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
            {isDeleting ? "Deleting..." : "Delete Attendance Record"}
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteAttendanceModal;