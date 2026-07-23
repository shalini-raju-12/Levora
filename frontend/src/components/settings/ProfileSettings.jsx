import { useState } from "react";
import { toast } from "react-toastify";
import ProfilePictureModal from "./ProfilePictureModal";

function ProfileSettings() {
  const [isProfilePictureModalOpen, setIsProfilePictureModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 234 567 8900",
    employeeId: "EMP001",
    department: "Engineering",
    designation: "Senior Software Engineer",
    profilePicture: null
  });

  const [originalData, setOriginalData] = useState({ ...formData });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    toast.info("Changes discarded.");
  };

  const handleSave = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setOriginalData({ ...formData });
    toast.success("Profile settings saved successfully.");
  };

  const handleProfilePictureUpload = () => {
    setIsProfilePictureModalOpen(true);
  };

  const handleProfilePictureSave = (file) => {
    setFormData({ ...formData, profilePicture: file });
    toast.success("Profile picture updated successfully.");
  };

  return (
    <div className="settings-card">
      <div className="settings-card-header">
        <h2 className="settings-card-title">Profile Settings</h2>
        <p className="settings-card-description">
          Update your personal information and profile picture
        </p>
      </div>
      <div className="settings-card-body">
        <div className="profile-picture-section">
          <div className="profile-picture-preview">
            {formData.profilePicture ? (
              <img src={URL.createObjectURL(formData.profilePicture)} alt="Profile" />
            ) : (
              <div className="profile-picture-placeholder">
                <span>{formData.fullName.charAt(0)}</span>
              </div>
            )}
          </div>
          <button
            className="btn-secondary"
            onClick={handleProfilePictureUpload}
          >
            Upload Picture
          </button>
        </div>

        <div className="settings-form">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleInputChange}
              className="form-input"
              disabled
              readOnly
            />
          </div>

          <div className="form-group">
            <label className="form-label">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your department"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your designation"
            />
          </div>

          <div className="form-actions">
            <button className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <ProfilePictureModal
        isOpen={isProfilePictureModalOpen}
        onClose={() => setIsProfilePictureModalOpen(false)}
        onSave={handleProfilePictureSave}
      />
    </div>
  );
}

export default ProfileSettings;
