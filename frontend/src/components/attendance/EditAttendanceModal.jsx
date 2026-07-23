import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import "../../styles/edit-attendance-modal.css";

function EditAttendanceModal({ isOpen, onClose, attendanceRecord, onUpdateAttendance, employees }) {
  const [formData, setFormData] = useState({
    employee: "",
    employeeId: "",
    department: "",
    date: "",
    checkIn: "",
    checkOut: "",
    status: "Present",
  });

  const [errors, setErrors] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (isOpen && attendanceRecord) {
      setFormData({
        employee: attendanceRecord.employee,
        employeeId: attendanceRecord.employeeId,
        department: attendanceRecord.department,
        date: attendanceRecord.date,
        checkIn: attendanceRecord.checkIn,
        checkOut: attendanceRecord.checkOut,
        status: attendanceRecord.status,
      });
      setErrors({});
      setHasUnsavedChanges(false);
    }
  }, [isOpen, attendanceRecord]);

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

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.checkIn) {
      newErrors.checkIn = "Check In time is required";
    }

    if (!formData.checkOut) {
      newErrors.checkOut = "Check Out time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateWorkingHours = (checkIn, checkOut) => {
    const [inHours, inMinutes] = checkIn.split(":").map(Number);
    const [outHours, outMinutes] = checkOut.split(":").map(Number);
    
    const inMinutesTotal = inHours * 60 + inMinutes;
    const outMinutesTotal = outHours * 60 + outMinutes;
    
    const diffMinutes = outMinutesTotal - inMinutesTotal;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    return `${hours}h ${minutes}m`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedAttendance = {
        ...attendanceRecord,
        employee: formData.employee,
        employeeId: formData.employeeId,
        department: formData.department,
        date: formData.date,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        workingHours: calculateWorkingHours(formData.checkIn, formData.checkOut),
        status: formData.status,
      };

      onUpdateAttendance(updatedAttendance);
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

  if (!isOpen || !attendanceRecord) return null;

  return (
    <>
      <div className="modal-overlay" onClick={handleOverlayClick}></div>
      <div className="edit-attendance-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Edit Attendance Record</h2>
            <p className="modal-subtitle">Update attendance details</p>
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
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData((prev) => ({ ...prev, [name]: value }));
                  setHasUnsavedChanges(true);
                  
                  const selectedEmployee = employees?.find((emp) => emp.name === value);
                  if (selectedEmployee) {
                    setFormData((prev) => ({ 
                      ...prev, 
                      employee: selectedEmployee.name,
                      employeeId: selectedEmployee.employeeId,
                      department: selectedEmployee.department || "IT"
                    }));
                  }
                  
                  if (errors[name]) {
                    setErrors((prev) => ({ ...prev, [name]: "" }));
                  }
                }}
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
                Employee ID
              </label>
              <input
                type="text"
                value={formData.employeeId}
                disabled
                className="form-input disabled"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Department
              </label>
              <input
                type="text"
                value={formData.department}
                disabled
                className="form-input disabled"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Date <span className="required">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`form-input ${errors.date ? "error" : ""}`}
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>

            <div className="form-group"></div>

            <div className="form-group">
              <label className="form-label">
                Check In <span className="required">*</span>
              </label>
              <input
                type="time"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                className={`form-input ${errors.checkIn ? "error" : ""}`}
              />
              {errors.checkIn && <span className="error-message">{errors.checkIn}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Check Out <span className="required">*</span>
              </label>
              <input
                type="time"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                className={`form-input ${errors.checkOut ? "error" : ""}`}
              />
              {errors.checkOut && <span className="error-message">{errors.checkOut}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Status <span className="required">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
                <option value="Half Day">Half Day</option>
              </select>
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

export default EditAttendanceModal;
