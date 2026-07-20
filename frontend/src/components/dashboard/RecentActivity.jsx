import { FiCalendar, FiUserPlus, FiDollarSign, FiClock, FiCheckCircle, FiFileText, FiBriefcase, FiEdit } from "react-icons/fi";

function RecentActivity() {
  const activities = [
    {
      id: 1,
      title: "John Smith applied for Annual Leave",
      description: "3 days requested",
      icon: FiCalendar,
      color: "#F4C542",
      timestamp: "2 minutes ago",
    },
    {
      id: 2,
      title: "Sarah Johnson joined the company",
      description: "New employee onboarded",
      icon: FiUserPlus,
      color: "#10b981",
      timestamp: "15 minutes ago",
    },
    {
      id: 3,
      title: "Payroll generated successfully",
      description: "Monthly payroll completed",
      icon: FiDollarSign,
      color: "#3b82f6",
      timestamp: "1 hour ago",
    },
    {
      id: 4,
      title: "Michael Brown checked in",
      description: "Attendance recorded",
      icon: FiClock,
      color: "#8b5cf6",
      timestamp: "Today, 9:10 AM",
    },
    {
      id: 5,
      title: "Emily Davis leave approved",
      description: "Sick leave request approved",
      icon: FiCheckCircle,
      color: "#10b981",
      timestamp: "Today, 11:45 AM",
    },
    {
      id: 6,
      title: "Attendance report exported",
      description: "Monthly report generated",
      icon: FiFileText,
      color: "#64748b",
      timestamp: "Yesterday",
    },
    {
      id: 7,
      title: "Department created",
      description: "Marketing department added",
      icon: FiBriefcase,
      color: "#f59e0b",
      timestamp: "2 days ago",
    },
    {
      id: 8,
      title: "Employee profile updated",
      description: "David Wilson profile modified",
      icon: FiEdit,
      color: "#ef4444",
      timestamp: "3 days ago",
    },
  ];

  return (
    <div className="recent-activity">
      <div className="recent-activity-header">
        <div>
          <h3 className="recent-activity-title">Recent Activity</h3>
          <p className="recent-activity-subtitle">Latest HR activities</p>
        </div>
      </div>
      <div className="recent-activity-list">
        {activities.map((activity, index) => (
          <div key={activity.id} className="recent-activity-item">
            <div className="recent-activity-icon-wrapper" style={{ backgroundColor: `${activity.color}15` }}>
              <activity.icon className="recent-activity-icon" style={{ color: activity.color }} size={16} />
            </div>
            <div className="recent-activity-content">
              <h4 className="recent-activity-title-text">{activity.title}</h4>
              <p className="recent-activity-description">{activity.description}</p>
            </div>
            <span className="recent-activity-timestamp">{activity.timestamp}</span>
            {index < activities.length - 1 && <div className="recent-activity-divider"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
