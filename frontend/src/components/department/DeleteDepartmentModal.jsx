import { useState, useEffect } from "react";
import { FiX, FiAlertTriangle } from "react-icons/fi";
import "../../styles/delete-department-modal.css";

function DeleteDepartmentModal({ isOpen, onClose, department, onDeleteDepartment }) {
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

  setTimeout(() => {
    onDeleteDepartment(department.id);
    setIsDeleting(false);
  }, 500);
};

  if (!isOpen || !department) return null;

  const hasEmployees = false;

  return (
    <>
      <div className="modal-overlay" onClick={() => !isDeleting && onClose()}></div>
      <div className="delete-department-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-content">
            <div className="warning-icon-wrapper">
              <FiAlertTriangle size={32} />
            </div>
            <div>
              <h2 className="modal-title">Delete Department</h2>
              <p className="modal-subtitle">Confirm department deletion</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={() => !isDeleting && onClose()}>
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Department Details */}
          <div className="department-details">
            <div className="detail-item">
              <span className="detail-label">Department Name</span>
              <span className="detail-value">{department.name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Department Code</span>
              <span className="detail-value">{department.code}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Department Head</span>
              <span className="detail-value">{department.head}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Total Employees</span>
              <span className="detail-value employees">{department.employees}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status</span>
              <span className={`status-badge ${department.status === "Active" ? "status-active" : "status-inactive"}`}>
                {department.status}
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
                  Are you sure you want to permanently delete this department?
                  This action cannot be undone.
                </p>
              </div>
            </div>

            {hasEmployees && (
              <div className="warning-card danger">
                <FiAlertTriangle className="warning-icon" size={20} />
                <div className="warning-content">
                  <h4 className="warning-title">Cannot Delete</h4>
                  <p className="warning-message">
                    This department currently contains {department.employees} employee(s).
                    You must reassign employees before deleting this department.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={() => !isDeleting && onClose()} disabled={isDeleting}>
            Cancel
          </button>
          <button
            className="btn-delete"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Department"}
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteDepartmentModal;
