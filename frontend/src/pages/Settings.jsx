import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProfileSettings from "../components/settings/ProfileSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import SystemSettings from "../components/settings/SystemSettings";
import DeleteAccountModal from "../components/settings/DeleteAccountModal";
import DeactivateAccountModal from "../components/settings/DeactivateAccountModal";

import "../styles/settings.css";

function Settings() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

  // Theme State
  const [theme, setTheme] = useState(
    localStorage.getItem("levora-theme") || "light"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const handleApplyTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("levora-theme", selectedTheme);

    document.body.setAttribute("data-theme", selectedTheme);

    toast.success(`${selectedTheme} theme applied successfully.`);
  };

  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeactivateAccount = () => {
    setIsDeactivateModalOpen(true);
  };

  const handleDownloadData = () => {
    toast.success("Your data is being prepared for download.");
  };

  return (
    <div className="settings-container">

      <div className="settings-header">
        <div>
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">
            Manage your account preferences, security and system configuration.
          </p>
        </div>
      </div>

      <div className="settings-sections">

        <ProfileSettings />

        <SecuritySettings />

        <NotificationSettings />

        <AppearanceSettings
          currentTheme={theme}
          onApplyTheme={handleApplyTheme}
        />

        <SystemSettings />

        <div className="settings-card danger-zone">

          <div className="settings-card-header">
            <h2 className="settings-card-title">
              Account Actions
            </h2>

            <p className="settings-card-description">
              Irreversible and destructive actions
            </p>
          </div>

          <div className="settings-card-body">

            <div className="account-actions">

              <button
                className="btn-secondary"
                onClick={handleDownloadData}
              >
                Download My Data
              </button>

              <button
                className="btn-warning"
                onClick={handleDeactivateAccount}
              >
                Deactivate Account
              </button>

              <button
                className="btn-danger"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>

            </div>

          </div>

        </div>

      </div>

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />

      <DeactivateAccountModal
        isOpen={isDeactivateModalOpen}
        onClose={() => setIsDeactivateModalOpen(false)}
      />

    </div>
  );
}

export default Settings;