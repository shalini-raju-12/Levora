import { FiCheck, FiX, FiEye, FiArrowRight } from "react-icons/fi";

function RecentLeaveRequests() {
  const leaveRequests = [
    {
      id: 1,
      employee: "John Smith",
      employeeId: "EMP001",
      leaveType: "Annual Leave",
      duration: "3 Days",
      appliedDate: "12 Jul 2026",
      status: "Pending",
    },
    {
      id: 2,
      employee: "Sarah Johnson",
      employeeId: "EMP002",
      leaveType: "Sick Leave",
      duration: "2 Days",
      appliedDate: "11 Jul 2026",
      status: "Approved",
    },
    {
      id: 3,
      employee: "Michael Brown",
      employeeId: "EMP003",
      leaveType: "Casual Leave",
      duration: "1 Day",
      appliedDate: "10 Jul 2026",
      status: "Pending",
    },
    {
      id: 4,
      employee: "Emily Davis",
      employeeId: "EMP004",
      leaveType: "Work From Home",
      duration: "5 Days",
      appliedDate: "09 Jul 2026",
      status: "Rejected",
    },
    {
      id: 5,
      employee: "David Wilson",
      employeeId: "EMP005",
      leaveType: "Annual Leave",
      duration: "4 Days",
      appliedDate: "08 Jul 2026",
      status: "Approved",
    },
    {
      id: 6,
      employee: "Jennifer Taylor",
      employeeId: "EMP006",
      leaveType: "Sick Leave",
      duration: "1 Day",
      appliedDate: "07 Jul 2026",
      status: "Pending",
    },
    {
      id: 7,
      employee: "Robert Anderson",
      employeeId: "EMP007",
      leaveType: "Casual Leave",
      duration: "2 Days",
      appliedDate: "06 Jul 2026",
      status: "Approved",
    },
    {
      id: 8,
      employee: "Lisa Martinez",
      employeeId: "EMP008",
      leaveType: "Annual Leave",
      duration: "5 Days",
      appliedDate: "05 Jul 2026",
      status: "Pending",
    },
  ];

  const getStatusBadge = (status) => {
    const statusStyles = {
      Pending: "status-pending",
      Approved: "status-approved",
      Rejected: "status-rejected",
    };
    return `status-badge ${statusStyles[status] || ""}`;
  };

  return (
    <div className="recent-leave-requests">
      <div className="recent-leave-header">
        <h3 className="recent-leave-title">Recent Leave Requests</h3>
        <button className="view-all-btn">
          View All
          <FiArrowRight size={16} />
        </button>
      </div>
      <div className="table-responsive">
        <table className="recent-leave-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Employee ID</th>
              <th>Leave Type</th>
              <th>Duration</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td className="employee-cell">
                  <div className="employee-avatar">
                    {request.employee.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span>{request.employee}</span>
                </td>
                <td>{request.employeeId}</td>
                <td>{request.leaveType}</td>
                <td>{request.duration}</td>
                <td>{request.appliedDate}</td>
                <td>
                  <span className={getStatusBadge(request.status)}>
                    {request.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    {request.status === "Pending" && (
                      <>
                        <button className="action-btn approve-btn" title="Approve">
                          <FiCheck size={14} />
                        </button>
                        <button className="action-btn reject-btn" title="Reject">
                          <FiX size={14} />
                        </button>
                      </>
                    )}
                    <button className="action-btn view-btn" title="View">
                      <FiEye size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentLeaveRequests;
