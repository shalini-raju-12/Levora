import { FiX, FiTrash2 } from "react-icons/fi";
import { useEffect } from "react";
import "../../styles/delete-employee-modal.css";

function DeleteEmployeeModal({ isOpen, onClose, employee, onDelete }) {
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

  const handleDelete = () => {
    onDelete(employee.id);
    
  };

  if (!isOpen || !employee) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="delete-employee-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="header-left">
            <div className="warning-icon-wrapper">
              <FiTrash2 className="warning-icon" size={24} />
            </div>
            <div className="header-text">
              <h2 className="modal-title">Delete Employee</h2>
              <p className="modal-subtitle">This action cannot be undone.</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Employee Details */}
          <div className="employee-details">
            <div
              className="employee-avatar"
              style={{ backgroundColor: getProfileColor(employee.name) }}
            >
              {getInitials(employee.name)}
            </div>
            <div className="employee-info">
              <h3 className="employee-name">{employee.name}</h3>
              <p className="employee-id">{employee.employeeId}</p>
              <p className="employee-department">
                {employee.department} • {employee.designation}
              </p>
            </div>
          </div>

          {/* Warning Message */}
          <div className="warning-message">
            <p className="warning-text">
              Are you sure you want to permanently remove this employee from the system?
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-delete" onClick={handleDelete}>
            <FiTrash2 size={16} />
            Delete Employee
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteEmployeeModal;
