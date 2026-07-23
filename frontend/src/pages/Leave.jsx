import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiDownload,
  FiPlus,
  FiEye,
  FiEdit,
  FiTrash2
  } from "react-icons/fi";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddLeaveModal from "../components/leave/AddLeaveModal";
import ViewLeaveModal from "../components/leave/ViewLeaveModal";
import EditLeaveModal from "../components/leave/EditLeaveModal";
import DeleteLeaveModal from "../components/leave/DeleteLeaveModal";
import SearchInput from "../components/common/SearchInput";

import "../styles/leave.css";
import "../styles/add-leave-modal.css";
import "../styles/view-leave-modal.css";
import "../styles/edit-leave-modal.css";
import "../styles/delete-leave-modal.css";

function Leave() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterLeaveType, setFilterLeaveType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterLeaveType, filterStatus]);
  const [isLoading, setIsLoading] = useState(true);
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employee: "John Smith",
      employeeId: "EMP001",
      leaveType: "Annual Leave",
      startDate: "2026-07-25",
      endDate: "2026-07-27",
      days: 3,
      reason: "Family Vacation",
      status: "Pending",
      appliedDate: "2026-07-15",
    },
    {
      id: 2,
      employee: "Sarah Johnson",
      employeeId: "EMP002",
      leaveType: "Sick Leave",
      startDate: "2026-07-18",
      endDate: "2026-07-19",
      days: 2,
      reason: "Fever",
      status: "Approved",
      appliedDate: "2026-07-16",
    },
    {
      id: 3,
      employee: "David Wilson",
      employeeId: "EMP003",
      leaveType: "Casual Leave",
      startDate: "2026-07-30",
      endDate: "2026-07-30",
      days: 1,
      reason: "Personal Work",
      status: "Rejected",
      appliedDate: "2026-07-18",
    },
    {
      id: 4,
      employee: "Emily Brown",
      employeeId: "EMP004",
      leaveType: "Annual Leave",
      startDate: "2026-08-05",
      endDate: "2026-08-09",
      days: 5,
      reason: "Vacation",
      status: "Approved",
      appliedDate: "2026-07-20",
    },
  ]);

  const employees = [
    { id: 1, name: "John Smith", employeeId: "EMP001" },
    { id: 2, name: "Sarah Johnson", employeeId: "EMP002" },
    { id: 3, name: "David Wilson", employeeId: "EMP003" },
    { id: 4, name: "Emily Brown", employeeId: "EMP004" },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const filteredLeaveRequests = useMemo(() => {
    return leaveRequests.filter((leave) => {
      const matchesSearch =
        leave.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leave.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLeave =
        filterLeaveType === "" || leave.leaveType === filterLeaveType;

      const matchesStatus =
        filterStatus === "" || leave.status === filterStatus;

      return matchesSearch && matchesLeave && matchesStatus;
    });
  }, [leaveRequests, searchTerm, filterLeaveType, filterStatus]);

  const leaveRequestsPerPage = 3;
  const totalPages = Math.ceil(filteredLeaveRequests.length / leaveRequestsPerPage);
  const startIndex = (currentPage - 1) * leaveRequestsPerPage;
  const endIndex = startIndex + leaveRequestsPerPage;
  const currentLeaves = filteredLeaveRequests.slice(startIndex, endIndex);

  const handleAddLeave = (newLeave) => {
    setLeaveRequests((prev) => [...prev, newLeave]);
    toast.success("Leave request submitted successfully.");
  };

  const handleViewLeave = (leaveRequest) => {
    setSelectedLeaveRequest(leaveRequest);
    setIsViewModalOpen(true);
  };

  const handleEditLeave = (leaveRequest) => {
    setSelectedLeaveRequest(leaveRequest);
    setIsViewModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleUpdateLeave = (updatedLeave) => {
    setLeaveRequests((prevLeaveRequests) =>
      prevLeaveRequests.map((leave) =>
        leave.id === updatedLeave.id ? updatedLeave : leave
      )
    );
    toast.success("Leave request updated successfully.");
  };

  const handleDeleteLeave = (leaveRequest) => {
    setSelectedLeaveRequest(leaveRequest);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteLeaveConfirm = (leaveRequestId) => {
    setLeaveRequests((prevLeaveRequests) =>
      prevLeaveRequests.filter((leave) => leave.id !== leaveRequestId)
    );
    setIsDeleteModalOpen(false);
    setSelectedLeaveRequest(null);
    toast.success("Leave request deleted successfully.");
  };

  const handleExportCSV = () => {
    const headers = [
      "Employee",
      "Employee ID",
      "Leave Type",
      "Start Date",
      "End Date",
      "Days",
      "Reason",
      "Status",
      "Applied Date",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredLeaveRequests.map((leave) =>
        [
          leave.employee,
          leave.employeeId,
          leave.leaveType,
          leave.startDate,
          leave.endDate,
          leave.days,
          leave.reason,
          leave.status,
          leave.appliedDate,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "leave_requests.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Leave requests exported successfully.");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
const stats = [
  {
    title: "Total Requests",
    value: leaveRequests.length,
    icon: FiCalendar,
    color: "#3b82f6",
  },
  {
    title: "Pending",
    value: leaveRequests.filter(
      (leave) => leave.status === "Pending"
    ).length,
    icon: FiClock,
    color: "#f59e0b",
  },
  {
    title: "Approved",
    value: leaveRequests.filter(
      (leave) => leave.status === "Approved"
    ).length,
    icon: FiCheckCircle,
    color: "#10b981",
  },
  {
    title: "Rejected",
    value: leaveRequests.filter(
      (leave) => leave.status === "Rejected"
    ).length,
    icon: FiXCircle,
    color: "#ef4444",
  },
];
  return (
  <div className="leave-container">

    {/* Page Header */}
    <div className="leave-header">
      <div>
        <h1 className="leave-title">Leave Management</h1>
        <p className="leave-subtitle">
          Manage employee leave requests and approvals.
        </p>
      </div>
    </div>

    {/* Stats */}
    <div className="leave-stats-grid">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="leave-stat-card"
          style={{ borderTop: `4px solid ${stat.color}` }}
        >
          <div className="leave-stat-icon">
            <stat.icon size={24} color={stat.color} />
          </div>

          <div className="leave-stat-content">
            <h3>{stat.value}</h3>
            <p>{stat.title}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Filter Section */}
    <div className="leave-filter-section">

      <div className="leave-filter-left">

        <SearchInput
          placeholder="Search employee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={filterLeaveType}
          onChange={(e) => setFilterLeaveType(e.target.value)}
        >
          <option value="">All Leave Types</option>
          <option value="Annual Leave">Annual Leave</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Casual Leave">Casual Leave</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

      </div>

      <div className="leave-filter-right">

        <button className="export-btn" onClick={handleExportCSV}>
          <FiDownload />
          Export
        </button>

        <button className="apply-leave-btn" onClick={() => setIsAddModalOpen(true)}>
          <FiPlus />
          Apply Leave
        </button>

      </div>

    </div>

    {/* Table */}
    <div className="leave-table-section">

      {isLoading ? (
        <div className="loading-skeleton">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton-row"></div>
          ))}
        </div>
      ) : currentLeaves.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <FiCalendar size={48} />
          </div>
          <h3>No Leave Requests Found</h3>
          <p>
            {filteredLeaveRequests.length === 0 && (searchTerm || filterLeaveType || filterStatus)
              ? "Try adjusting your search or filters."
              : "Click Apply Leave to create your first leave request."}
          </p>
          <button className="apply-leave-btn" onClick={() => setIsAddModalOpen(true)}>
            <FiPlus />
            Apply Leave
          </button>
        </div>
      ) : (
        <table className="leave-table">

        <thead>
          <tr>
            <th>Employee</th>
            <th>Employee ID</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Days</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {currentLeaves.map((leave) => (
            <tr key={leave.id}>

                <td>
                  <div className="employee-cell">

                    <div className="employee-avatar">
                      {leave.employee && leave.employee.length > 0 ? leave.employee.charAt(0) : '?'}
                    </div>

                    <div>
                      <h4>{leave.employee || 'N/A'}</h4>
                    </div>

                  </div>
                </td>

                <td>{leave.employeeId || 'N/A'}</td>

                <td>{leave.leaveType || 'N/A'}</td>

                <td>{leave.startDate || 'N/A'}</td>

                <td>{leave.endDate || 'N/A'}</td>

                <td>{leave.days !== undefined && leave.days !== null ? leave.days : 'N/A'}</td>

                <td>
                  <span className={`leave-status ${leave.status ? leave.status.toLowerCase() : ''}`}>
                    {leave.status || 'N/A'}
                  </span>
                </td>

                <td>

                  <div className="action-buttons">

                    <button className="view-btn" onClick={() => handleViewLeave(leave)}>
                      <FiEye />
                    </button>

                    <button className="edit-btn" onClick={() => handleEditLeave(leave)}>
                      <FiEdit />
                    </button>

                    <button className="delete-btn" onClick={() => handleDeleteLeave(leave)}>
                      <FiTrash2 />
                    </button>

                  </div>

                </td>

              </tr>
            ))}
        </tbody>

      </table>
      )}
    </div>

    {/* Pagination */}
    {filteredLeaveRequests.length > 0 && (
      <div className="pagination-section">
        <div className="pagination-info">
          Showing {filteredLeaveRequests.length > 0 ? startIndex + 1 : 0}–{Math.min(endIndex, filteredLeaveRequests.length)} of {filteredLeaveRequests.length} Leave Requests
        </div>
        <div className="pagination-controls">
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-number ${currentPage === page ? "active" : ""}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className="pagination-btn"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    )}

    {/* Add Leave Modal */}
    <AddLeaveModal
      isOpen={isAddModalOpen}
      onClose={() => setIsAddModalOpen(false)}
      onAddLeave={handleAddLeave}
      employees={employees}
    />

    {/* View Leave Modal */}
    <ViewLeaveModal
      isOpen={isViewModalOpen}
      onClose={() => setIsViewModalOpen(false)}
      leaveRequest={selectedLeaveRequest}
    />

    {/* Edit Leave Modal */}
    <EditLeaveModal
      isOpen={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      leaveRequest={selectedLeaveRequest}
      onUpdateLeave={handleUpdateLeave}
      employees={employees}
    />

    {/* Delete Leave Modal */}
    <DeleteLeaveModal
      isOpen={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
      leaveRequest={selectedLeaveRequest}
      onDeleteLeave={handleDeleteLeaveConfirm}
    />

  </div>
);
}

export default Leave;