import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import "../../styles/edit-employee-modal.css";

function EditEmployeeModal({ isOpen, onClose, employee, onUpdateEmployee }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    employeeId: "",
    department: "",
    designation: "",
    manager: "",
    employmentType: "Full Time",
    joiningDate: "",
    status: "Active",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        gender: employee.gender || "",
        dateOfBirth: employee.dateOfBirth || "",
        employeeId: employee.employeeId || "",
        department: employee.department || "",
        designation: employee.designation || "",
        manager: employee.manager || "",
        employmentType: employee.employmentType || "Full Time",
        joiningDate: employee.joiningDate || "",
        status: employee.status || "Active",
        address: employee.address || "",
        city: employee.city || "",
        state: employee.state || "",
        country: employee.country || "",
        zipCode: employee.zipCode || "",
      });
      setErrors({});
    }
  }, [employee]);

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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Personal Information validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]+$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain only numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedEmployee = {
        ...employee,
        ...formData,
      };
      console.log("Employee Updated", updatedEmployee);
      onUpdateEmployee(updatedEmployee);
      onClose();
    }
  };

  const handleCancel = () => {
    setErrors({});
    onClose();
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      /^\+?[\d\s-]+$/.test(formData.phone)
    );
  };

  if (!isOpen || !employee) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="edit-employee-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Edit Employee</h2>
            <p className="modal-subtitle">Update employee information</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form className="modal-body" onSubmit={handleSubmit}>
          {/* Section 1: Personal Information */}
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  First Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`form-input ${errors.firstName ? "error" : ""}`}
                  placeholder="Enter first name"
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">
                  Last Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`form-input ${errors.lastName ? "error" : ""}`}
                  placeholder="Enter last name"
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? "error" : ""}`}
                  placeholder="employee@levora.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input ${errors.phone ? "error" : ""}`}
                  placeholder="+1 234 567 8901"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Work Information */}
          <div className="form-section">
            <h3 className="section-title">Work Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Employee ID</label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  className="form-input readonly"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Sales">Sales</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Senior Developer"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Manager</label>
                <input
                  type="text"
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Manager name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Employment Type</label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Joining Date</label>
                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  className="form-input"
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
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Address */}
          <div className="form-section">
            <h3 className="section-title">Address</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Street address"
                />
              </div>
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="City"
                />
              </div>
              <div className="form-group">
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="State"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Country"
                />
              </div>
              <div className="form-group">
                <label className="form-label">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="ZIP Code"
                />
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-save" disabled={!isFormValid()}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditEmployeeModal;
