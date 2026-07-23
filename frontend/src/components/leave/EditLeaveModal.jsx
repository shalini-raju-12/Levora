import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import "../../styles/edit-leave-modal.css";

function EditLeaveModal({ isOpen, onClose, leaveRequest, onUpdateLeave, employees }) {
  const [formData, setFormData] = useState({
    employee: "",
    employeeId: "",
    leaveType: "Annual Leave",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (isOpen && leaveRequest) {
      setFormData({
        employee: leaveRequest.employee,
        employeeId: leaveRequest.employeeId,
        leaveType: leaveRequest.leaveType,
        startDate: leaveRequest.startDate,
        endDate: leaveRequest.endDate,
        reason: leaveRequest.reason,
      });
      setErrors({});
      setHasUnsavedChanges(false);
    }
  }, [isOpen, leaveRequest]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        if (hasUnsavedChanges) {
          if (confirm("You have unsaved changes. Are you sure you want to close?")) {
            setHasUnsavedChanges(false);
            onClose();
          }
        } else {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, hasUnsavedChanges]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({ ...prev, [name]: value }));
    setHasUnsavedChanges(true);
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.employee) {
      newErrors.employee = "Employee is required";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    } else if (formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = "End date must be after start date";
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Reason is required";
    } else if (formData.reason.trim().length < 10) {
      newErrors.reason = "Reason must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedLeave = {
        ...leaveRequest,
        employee: formData.employee,
        employeeId: formData.employeeId,
        leaveType: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        days: calculateDays(formData.startDate, formData.endDate),
        reason: formData.reason.trim(),
      };

      onUpdateLeave(updatedLeave);
      setHasUnsavedChanges(false);
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (confirm("You have unsaved changes. Are you sure you want to close?")) {
        setErrors({});
        setHasUnsavedChanges(false);
        onClose();
      }
    } else {
      setErrors({});
      onClose();
    }
  };

  const handleOverlayClick = () => {
    if (hasUnsavedChanges) {
      if (confirm("You have unsaved changes. Are you sure you want to close?")) {
        setErrors({});
        setHasUnsavedChanges(false);
        onClose();
      }
    } else {
      onClose();
    }
  };

  if (!isOpen || !leaveRequest) return null;

  return (
    <>
      <div className="modal-overlay" onClick={handleOverlayClick}></div>
      <div className="edit-leave-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Edit Leave Request</h2>
            <p className="modal-subtitle">Update leave request details</p>
          </div>
          <button className="modal-close-btn" onClick={handleCancel}>
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">
                Employee Name <span className="required">*</span>
              </label>
              <select
                name="employee"
                value={formData.employee}
                onChange={handleChange}
                className={`form-input ${errors.employee ? "error" : ""}`}
              >
                <option value="">Select Employee</option>
                {employees?.map((emp) => (
                  <option key={emp.id} value={emp.name}>
                    {emp.name} ({emp.employeeId})
                  </option>
                ))}
              </select>
              {errors.employee && <span className="error-message">{errors.employee}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Leave Type <span className="required">*</span>
              </label>
              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Annual Leave">Annual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Maternity Leave">Maternity Leave</option>
                <option value="Paternity Leave">Paternity Leave</option>
                <option value="Work From Home">Work From Home</option>
              </select>
            </div>

            <div className="form-group"></div>

            <div className="form-group">
              <label className="form-label">
                Start Date <span className="required">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`form-input ${errors.startDate ? "error" : ""}`}
              />
              {errors.startDate && <span className="error-message">{errors.startDate}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                End Date <span className="required">*</span>
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={`form-input ${errors.endDate ? "error" : ""}`}
              />
              {errors.endDate && <span className="error-message">{errors.endDate}</span>}
            </div>

            <div className="form-group full-width">
              <label className="form-label">
                Reason <span className="required">*</span>
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className={`form-input ${errors.reason ? "error" : ""}`}
                placeholder="Please provide a reason for your leave request..."
                rows="4"
              />
              {errors.reason && <span className="error-message">{errors.reason}</span>}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditLeaveModal;
