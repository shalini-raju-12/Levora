import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import "../../styles/add-department-modal.css";

function AddDepartmentModal({ isOpen, onClose, onAddDepartment, existingDepartments }) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    head: "",
    location: "",
    description: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        code: "",
        head: "",
        location: "",
        description: "",
        status: "Active",
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
    
    if (name === "code") {
      setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Department Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Department name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Department name must be at least 3 characters";
    }

    // Department Code validation
    if (!formData.code.trim()) {
      newErrors.code = "Department code is required";
    } else {
      const codeExists = existingDepartments?.some(
        (dept) => dept.code.toLowerCase() === formData.code.toLowerCase()
      );
      if (codeExists) {
        newErrors.code = "Department code already exists";
      }
    }

    // Department Head validation
    if (!formData.head.trim()) {
      newErrors.head = "Department head is required";
    }

    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newDepartment = {
        id: Date.now(),
        name: formData.name.trim(),
        code: formData.code.trim().toUpperCase(),
        head: formData.head.trim(),
        location: formData.location.trim(),
        description: formData.description.trim(),
        status: formData.status,
        employees: 0,
        createdDate: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };

      onAddDepartment(newDepartment);
      onClose();
    }
  };

  const handleCancel = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="add-department-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Add Department</h2>
            <p className="modal-subtitle">Create a new department for your organization</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Department Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? "error" : ""}`}
                placeholder="e.g., Human Resources"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Department Code <span className="required">*</span>
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className={`form-input ${errors.code ? "error" : ""}`}
                placeholder="e.g., HR001"
              />
              {errors.code && <span className="error-message">{errors.code}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Department Head <span className="required">*</span>
              </label>
              <input
                type="text"
                name="head"
                value={formData.head}
                onChange={handleChange}
                className={`form-input ${errors.head ? "error" : ""}`}
                placeholder="e.g., John Smith"
              />
              {errors.head && <span className="error-message">{errors.head}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Location <span className="required">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`form-input ${errors.location ? "error" : ""}`}
                placeholder="e.g., New York, USA"
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            <div className="form-group full-width">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-input"
                placeholder="Brief description of the department..."
                rows="3"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Add Department
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddDepartmentModal;
