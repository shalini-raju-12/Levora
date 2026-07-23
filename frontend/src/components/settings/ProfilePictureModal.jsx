import { useState } from "react";
import { toast } from "react-toastify";

function ProfilePictureModal({ isOpen, onClose, onSave }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  if (!isOpen) return null;

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB.");
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file.");
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if (!selectedFile) {
      toast.error("Please select a profile picture.");
      return;
    }

    onSave(selectedFile);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Upload Profile Picture</h2>
          <button className="modal-close" onClick={handleCancel}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="profile-picture-upload">
            <div className="upload-preview">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" />
              ) : (
                <div className="upload-placeholder">
                  <span>📷</span>
                  <p>No image selected</p>
                </div>
              )}
            </div>

            <div className="upload-controls">
              <input
                type="file"
                id="profilePictureInput"
                accept="image/*"
                onChange={handleFileSelect}
                className="file-input"
              />
              <label htmlFor="profilePictureInput" className="btn-secondary">
                Choose File
              </label>
              <p className="upload-info">
                Accepted formats: JPG, PNG, GIF. Max size: 5MB
              </p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Upload Picture
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePictureModal;
