import { useState } from "react";
import { toast } from "react-toastify";

function DeactivateAccountModal({ isOpen, onClose }) {
  const [reason, setReason] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleDeactivate = () => {
    if (!reason) {
      toast.error("Please provide a reason for deactivation.");
      return;
    }

    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    toast.success("Account deactivated successfully.");
    onClose();
    setReason("");
    setPassword("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Deactivate Account</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="info-message">
            <p>
              Deactivating your account will temporarily disable your access to the
              system. Your data will be preserved and you can reactivate your account
              by contacting the administrator.
            </p>
          </div>

          <div className="form-group">
            <label className="form-label">Reason for deactivation</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="form-textarea"
              placeholder="Please explain why you want to deactivate your account"
              rows="4"
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
          <button className="btn-warning" onClick={handleDeactivate}>
            Deactivate Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeactivateAccountModal;
