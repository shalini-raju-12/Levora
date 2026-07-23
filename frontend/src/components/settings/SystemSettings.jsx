import { useState } from "react";
import { toast } from "react-toastify";

function SystemSettings() {
  const [systemSettings, setSystemSettings] = useState({
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    currency: 'USD',
    rememberLogin: true,
    autoLogout: false,
    maintenanceMode: false
  });

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSystemSettings({ ...systemSettings, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSystemSettings({ ...systemSettings, [name]: checked });
  };

  const handleSaveSettings = () => {
    toast.success("System settings saved successfully.");
  };

  return (
    <div className="settings-card">
      <div className="settings-card-header">
        <h2 className="settings-card-title">System Settings</h2>
        <p className="settings-card-description">
          Configure system preferences and regional settings
        </p>
      </div>
      <div className="settings-card-body">
        <div className="settings-form">
          <div className="form-group">
            <label className="form-label">Language</label>
            <select
              name="language"
              value={systemSettings.language}
              onChange={handleSelectChange}
              className="form-select"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Timezone</label>
            <select
              name="timezone"
              value={systemSettings.timezone}
              onChange={handleSelectChange}
              className="form-select"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">GMT</option>
              <option value="Asia/Kolkata">IST</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Date Format</label>
            <select
              name="dateFormat"
              value={systemSettings.dateFormat}
              onChange={handleSelectChange}
              className="form-select"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Time Format</label>
            <select
              name="timeFormat"
              value={systemSettings.timeFormat}
              onChange={handleSelectChange}
              className="form-select"
            >
              <option value="12h">12 Hour (AM/PM)</option>
              <option value="24h">24 Hour</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Currency</label>
            <select
              name="currency"
              value={systemSettings.currency}
              onChange={handleSelectChange}
              className="form-select"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberLogin"
                checked={systemSettings.rememberLogin}
                onChange={handleCheckboxChange}
                className="checkbox-input"
              />
              <span>Remember Login</span>
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="autoLogout"
                checked={systemSettings.autoLogout}
                onChange={handleCheckboxChange}
                className="checkbox-input"
              />
              <span>Auto Logout after inactivity</span>
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={systemSettings.maintenanceMode}
                onChange={handleCheckboxChange}
                className="checkbox-input"
              />
              <span>Enable Maintenance Mode</span>
            </label>
          </div>

          <div className="form-actions">
            <button className="btn-primary" onClick={handleSaveSettings}>
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemSettings;
