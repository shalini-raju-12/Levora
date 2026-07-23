import { useState } from "react";
import { toast } from "react-toastify";

function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    leaveApprovalAlerts: true,
    attendanceAlerts: true,
    payrollNotifications: true,
    systemAnnouncements: true
  });

  const handleToggle = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
    toast.success(`${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} ${!notifications[key] ? 'enabled' : 'disabled'}.`);
  };

  return (
    <div className="settings-card">
      <div className="settings-card-header">
        <h2 className="settings-card-title">Notification Settings</h2>
        <p className="settings-card-description">
          Manage your notification preferences
        </p>
      </div>
      <div className="settings-card-body">
        <div className="notification-toggles">
          <div className="toggle-item">
            <div className="toggle-info">
              <h3 className="toggle-title">Email Notifications</h3>
              <p className="toggle-description">Receive notifications via email</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="toggle-item">
            <div className="toggle-info">
              <h3 className="toggle-title">SMS Notifications</h3>
              <p className="toggle-description">Receive notifications via SMS</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.smsNotifications}
                onChange={() => handleToggle('smsNotifications')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="toggle-item">
            <div className="toggle-info">
              <h3 className="toggle-title">Leave Approval Alerts</h3>
              <p className="toggle-description">Get notified when leave is approved/rejected</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.leaveApprovalAlerts}
                onChange={() => handleToggle('leaveApprovalAlerts')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="toggle-item">
            <div className="toggle-info">
              <h3 className="toggle-title">Attendance Alerts</h3>
              <p className="toggle-description">Get notified about attendance updates</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.attendanceAlerts}
                onChange={() => handleToggle('attendanceAlerts')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="toggle-item">
            <div className="toggle-info">
              <h3 className="toggle-title">Payroll Notifications</h3>
              <p className="toggle-description">Get notified about payroll updates</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.payrollNotifications}
                onChange={() => handleToggle('payrollNotifications')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="toggle-item">
            <div className="toggle-info">
              <h3 className="toggle-title">System Announcements</h3>
              <p className="toggle-description">Receive system-wide announcements</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.systemAnnouncements}
                onChange={() => handleToggle('systemAnnouncements')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationSettings;
