import { FiUserPlus, FiCalendar, FiCheckCircle, FiBriefcase, FiBarChart2, FiDollarSign, FiArrowRight } from "react-icons/fi";

function QuickActions() {
  const quickActions = [
    {
      id: 1,
      title: "Add Employee",
      description: "Register new team member",
      icon: FiUserPlus,
      color: "#F4C542",
    },
    {
      id: 2,
      title: "Apply Leave",
      description: "Submit leave request",
      icon: FiCalendar,
      color: "#3b82f6",
    },
    {
      id: 3,
      title: "Approve Requests",
      description: "Review pending requests",
      icon: FiCheckCircle,
      color: "#10b981",
    },
    {
      id: 4,
      title: "Manage Departments",
      description: "Organize team structure",
      icon: FiBriefcase,
      color: "#f59e0b",
    },
    {
      id: 5,
      title: "Attendance Report",
      description: "View attendance analytics",
      icon: FiBarChart2,
      color: "#8b5cf6",
    },
    {
      id: 6,
      title: "Payroll",
      description: "Manage salary payments",
      icon: FiDollarSign,
      color: "#ef4444",
    },
  ];

  const handleActionClick = (action) => {
    console.log("Action Clicked:", action.title);
  };

  return (
    <div className="quick-actions">
      <div className="quick-actions-header">
        <div>
          <h3 className="quick-actions-title">Quick Actions</h3>
          <p className="quick-actions-subtitle">Frequently used HR operations</p>
        </div>
      </div>
      <div className="quick-actions-grid">
        {quickActions.map((action) => (
          <div
            key={action.id}
            className="quick-action-card"
            onClick={() => handleActionClick(action)}
          >
            <div className="quick-action-icon-wrapper" style={{ backgroundColor: `${action.color}15` }}>
              <action.icon className="quick-action-icon" style={{ color: action.color }} size={24} />
            </div>
            <div className="quick-action-content">
              <h4 className="quick-action-title">{action.title}</h4>
              <p className="quick-action-description">{action.description}</p>
            </div>
            <FiArrowRight className="quick-action-arrow" size={16} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
