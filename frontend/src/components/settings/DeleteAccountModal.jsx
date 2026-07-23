import { useState } from "react";
import { toast } from "react-toastify";

function DeleteAccountModal({ isOpen, onClose }) {
  const [confirmationText, setConfirmationText] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleDelete = () => {
    if (confirmationText !== "DELETE") {
      toast.error("Please type DELETE to confirm.");
      return;
    }

    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    toast.success("Account deletion request submitted.");
    onClose();
    setConfirmationText("");
    setPassword("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content delete-modal">
        <div className="modal-header">
          <h2 className="modal-title">Delete Account</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="warning-message">
            <div className="warning-icon">⚠️</div>
            <h3>Warning: This action is irreversible</h3>
            <p>
              Deleting your account will permanently remove all your data including
              personal information, attendance records, leave requests, and payroll
              history. This action cannot be undone.
            </p>
          </div>

          <div className="form-group">
            <label className="form-label">Type "DELETE" to confirm</label>
            <input
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              className="form-input"
              placeholder="DELETE"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Enter your password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter password"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-danger" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccountModal;
