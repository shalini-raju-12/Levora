import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import "../../styles/add-leave-modal.css";

function AddLeaveModal({ isOpen, onClose, onAddLeave, employees }) {
  const [formData, setFormData] = useState({
    employee: "",
    employeeId: "",
    leaveType: "Annual Leave",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        employee: "",
        employeeId: "",
        leaveType: "Annual Leave",
        startDate: "",
        endDate: "",
        reason: "",
      });
      setErrors({});
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Auto-fill employeeId when employee is selected
    if (name === "employee") {
      const selectedEmployee = employees?.find((emp) => emp.name === value);
      if (selectedEmployee) {
        setFormData((prev) => ({ ...prev, employeeId: selectedEmployee.employeeId }));
      }
    }
    
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
      const newLeave = {
        id: Date.now(),
        employee: formData.employee,
        employeeId: formData.employeeId,
        leaveType: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        days: calculateDays(formData.startDate, formData.endDate),
        reason: formData.reason.trim(),
        status: "Pending",
        appliedDate: new Date().toISOString().split("T")[0],
      };

      onAddLeave(newLeave);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="add-leave-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Apply for Leave</h2>
            <p className="modal-subtitle">Submit a new leave request</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
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
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Apply Leave
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddLeaveModal;
