import { FiBell, FiCalendar, FiUser, FiDollarSign, FiAlertCircle, FiDatabase } from "react-icons/fi";

function NotificationsPanel() {
  const notifications = [
    {
      id: 1,
      title: "5 Leave requests pending approval",
      description: "Review and approve pending requests",
      icon: FiCalendar,
      color: "#F4C542",
      time: "10 minutes ago",
      unread: true,
    },
    {
      id: 2,
      title: "Attendance not submitted by 12 employees",
      description: "Follow up with missing attendance",
      icon: FiUser,
      color: "#ef4444",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Payroll generation due tomorrow",
      description: "Prepare payroll data",
      icon: FiDollarSign,
      color: "#3b82f6",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 4,
      title: "Company holiday next week",
      description: "Independence Day on August 15",
      icon: FiAlertCircle,
      color: "#f59e0b",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 5,
      title: "New employee onboarded",
      description: "Jennifer Taylor joined Engineering",
      icon: FiUser,
      color: "#10b981",
      time: "2 days ago",
      unread: false,
    },
    {
      id: 6,
      title: "Database backup completed",
      description: "Automatic backup successful",
      icon: FiDatabase,
      color: "#64748b",
      time: "3 days ago",
      unread: false,
    },
  ];

  return (
    <div className="notifications-panel">
      <div className="notifications-header">
        <div>
          <h3 className="notifications-title">Notifications</h3>
          <p className="notifications-subtitle">System Alerts</p>
        </div>
      </div>
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <div className="notification-icon-wrapper" style={{ backgroundColor: `${notification.color}15` }}>
              <notification.icon className="notification-icon" style={{ color: notification.color }} size={16} />
            </div>
            <div className="notification-content">
              <h4 className="notification-title">{notification.title}</h4>
              <p className="notification-description">{notification.description}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
            <div className={`notification-indicator ${notification.unread ? 'unread' : 'read'}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationsPanel;
