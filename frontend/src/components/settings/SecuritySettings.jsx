import { useState } from "react";
import { toast } from "react-toastify";

function SecuritySettings() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleCancel = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorEnabled: false
    });
    toast.info("Changes discarded.");
  };

  const handleUpdatePassword = () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    if (formData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    toast.success("Password updated successfully.");
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorEnabled: formData.twoFactorEnabled
    });
  };

  return (
    <div className="settings-card">
      <div className="settings-card-header">
        <h2 className="settings-card-title">Security Settings</h2>
        <p className="settings-card-description">
          Manage your password and two-factor authentication
        </p>
      </div>
      <div className="settings-card-body">
        <div className="settings-form">
          <div className="form-group">
            <label className="form-label">Current Password *</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter current password"
            />
          </div>

          <div className="form-group">
            <label className="form-label">New Password *</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter new password"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Confirm new password"
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="twoFactorEnabled"
                checked={formData.twoFactorEnabled}
                onChange={handleInputChange}
                className="checkbox-input"
              />
              <span>Enable Two-Factor Authentication</span>
            </label>
          </div>

          <div className="form-actions">
            <button className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn-primary" onClick={handleUpdatePassword}>
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecuritySettings;
