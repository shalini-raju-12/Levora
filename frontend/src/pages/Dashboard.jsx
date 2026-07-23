import { FiDownload } from "react-icons/fi";
import { FiUsers, FiCalendar, FiUserCheck, FiBriefcase } from "react-icons/fi";
import StatsCard from "../components/dashboard/StatsCard";
import AttendanceChart from "../components/dashboard/AttendanceChart";
import LeaveChart from "../components/dashboard/LeaveChart";
import RecentLeaveRequests from "../components/dashboard/RecentLeaveRequests";
import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";
import NotificationsPanel from "../components/dashboard/NotificationsPanel";
import "../styles/dashboard.css";

function Dashboard() {
  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-left">
          <h1 className="dashboard-greeting">Good Morning 👋</h1>
          <p className="dashboard-welcome">Welcome back, HR Manager</p>
        </div>
        <div className="dashboard-header-right">
          <span className="dashboard-date">{getCurrentDate()}</span>
          <button className="dashboard-download-btn">
            <FiDownload size={18} />
            Download Report
          </button>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="dashboard-section">
        <div className="dashboard-stats-grid">
          <StatsCard
            title="Total Employees"
            value="248"
            growth="+12% this month"
            icon={FiUsers}
            color="primary"
          />
          <StatsCard
            title="Leave Requests"
            value="34"
            growth="+8% this week"
            icon={FiCalendar}
            color="info"
          />
          <StatsCard
            title="Present Today"
            value="221"
            growth="89% Attendance"
            icon={FiUserCheck}
            color="success"
          />
          <StatsCard
            title="Departments"
            value="12"
            growth="+2 New"
            icon={FiBriefcase}
            color="warning"
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="dashboard-section">
        <div className="dashboard-charts-grid">
          <div className="dashboard-chart-card">
            <h3 className="dashboard-card-title">Attendance Overview</h3>
            <div className="dashboard-chart-container">
              <AttendanceChart />
            </div>
          </div>
          <div className="dashboard-chart-card">
            <h3 className="dashboard-card-title">Leave Distribution</h3>
            <div className="dashboard-chart-container">
              <LeaveChart />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="dashboard-section">
        <div className="dashboard-bottom-grid">
          <div className="dashboard-card">
            <RecentLeaveRequests />
          </div>
          <div className="dashboard-card">
            <QuickActions />
          </div>
        </div>
        <div className="dashboard-bottom-grid">
          <div className="dashboard-card">
            <NotificationsPanel />
          </div>
          <div className="dashboard-card">
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
