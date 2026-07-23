import {
  FiUsers,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiDownload,
  FiPlus,
  FiEye,
  FiEdit,
  FiTrash2
} from "react-icons/fi";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewAttendanceModal from "../components/attendance/ViewAttendanceModal";
import EditAttendanceModal from "../components/attendance/EditAttendanceModal";
import DeleteAttendanceModal from "../components/attendance/DeleteAttendanceModal";
import AddAttendanceModal from "../components/attendance/AddAttendanceModal";
import SearchInput from "../components/common/SearchInput";

import "../styles/attendance.css";
import "../styles/view-attendance-modal.css";
import "../styles/edit-attendance-modal.css";
import "../styles/delete-attendance-modal.css";
import "../styles/mark-attendance-modal.css";

function Attendance() {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMarkModalOpen, setIsMarkModalOpen] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterDepartment, filterStatus, filterDate]);

  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 1,
      employee: "John Smith",
      employeeId: "EMP001",
      department: "Engineering",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      workingHours: "9h 0m",
      status: "Present",
      date: "2026-07-20",
    },
    {
      id: 2,
      employee: "Sarah Johnson",
      employeeId: "EMP002",
      department: "Marketing",
      checkIn: "09:15 AM",
      checkOut: "06:30 PM",
      workingHours: "9h 15m",
      status: "Late",
      date: "2026-07-20",
    },
    {
      id: 3,
      employee: "David Wilson",
      employeeId: "EMP003",
      department: "Sales",
      checkIn: "-",
      checkOut: "-",
      workingHours: "0h 0m",
      status: "Absent",
      date: "2026-07-20",
    },
    {
      id: 4,
      employee: "Emily Brown",
      employeeId: "EMP004",
      department: "HR",
      checkIn: "09:30 AM",
      checkOut: "01:30 PM",
      workingHours: "4h 0m",
      status: "Half Day",
      date: "2026-07-20",
    },
    {
      id: 5,
      employee: "Michael Davis",
      employeeId: "EMP005",
      department: "Engineering",
      checkIn: "08:45 AM",
      checkOut: "05:45 PM",
      workingHours: "9h 0m",
      status: "Present",
      date: "2026-07-20",
    },
    {
      id: 6,
      employee: "Jessica Taylor",
      employeeId: "EMP006",
      department: "Finance",
      checkIn: "09:05 AM",
      checkOut: "06:05 PM",
      workingHours: "9h 0m",
      status: "Present",
      date: "2026-07-20",
    },
    {
      id: 7,
      employee: "Robert Anderson",
      employeeId: "EMP007",
      department: "Engineering",
      checkIn: "09:45 AM",
      checkOut: "06:45 PM",
      workingHours: "9h 0m",
      status: "Late",
      date: "2026-07-20",
    },
    {
      id: 8,
      employee: "Amanda White",
      employeeId: "EMP008",
      department: "Marketing",
      checkIn: "-",
      checkOut: "-",
      workingHours: "0h 0m",
      status: "Absent",
      date: "2026-07-20",
    },
    {
      id: 9,
      employee: "Christopher Martin",
      employeeId: "EMP009",
      department: "Sales",
      checkIn: "08:55 AM",
      checkOut: "05:55 PM",
      workingHours: "9h 0m",
      status: "Present",
      date: "2026-07-20",
    },
    {
      id: 10,
      employee: "Sarah Thompson",
      employeeId: "EMP010",
      department: "HR",
      checkIn: "09:00 AM",
      checkOut: "02:00 PM",
      workingHours: "5h 0m",
      status: "Half Day",
      date: "2026-07-20",
    },
    {
      id: 11,
      employee: "James Garcia",
      employeeId: "EMP011",
      department: "Finance",
      checkIn: "09:30 AM",
      checkOut: "06:30 PM",
      workingHours: "9h 0m",
      status: "Late",
      date: "2026-07-20",
    },
    {
      id: 12,
      employee: "Jennifer Martinez",
      employeeId: "EMP012",
      department: "Engineering",
      checkIn: "08:50 AM",
      checkOut: "05:50 PM",
      workingHours: "9h 0m",
      status: "Present",
      date: "2026-07-20",
    },
    {
      id: 13,
      employee: "Daniel Robinson",
      employeeId: "EMP013",
      department: "Marketing",
      checkIn: "-",
      checkOut: "-",
      workingHours: "0h 0m",
      status: "Absent",
      date: "2026-07-20",
    },
    {
      id: 14,
      employee: "Lisa Clark",
      employeeId: "EMP014",
      department: "Sales",
      checkIn: "09:10 AM",
      checkOut: "06:10 PM",
      workingHours: "9h 0m",
      status: "Present",
      date: "2026-07-20",
    },
    {
      id: 15,
      employee: "Kevin Rodriguez",
      employeeId: "EMP015",
      department: "HR",
      checkIn: "08:40 AM",
      checkOut: "05:40 PM",
      workingHours: "9h 0m",
      status: "Present",
      date: "2026-07-20",
    },
  ]);

  const employees = [
    { id: 1, name: "John Smith", employeeId: "EMP001", department: "Engineering" },
    { id: 2, name: "Sarah Johnson", employeeId: "EMP002", department: "Marketing" },
    { id: 3, name: "David Wilson", employeeId: "EMP003", department: "Sales" },
    { id: 4, name: "Emily Brown", employeeId: "EMP004", department: "HR" },
    { id: 5, name: "Michael Davis", employeeId: "EMP005", department: "Engineering" },
    { id: 6, name: "Jessica Taylor", employeeId: "EMP006", department: "Finance" },
    { id: 7, name: "Robert Anderson", employeeId: "EMP007", department: "Engineering" },
    { id: 8, name: "Amanda White", employeeId: "EMP008", department: "Marketing" },
    { id: 9, name: "Christopher Martin", employeeId: "EMP009", department: "Sales" },
    { id: 10, name: "Sarah Thompson", employeeId: "EMP010", department: "HR" },
    { id: 11, name: "James Garcia", employeeId: "EMP011", department: "Finance" },
    { id: 12, name: "Jennifer Martinez", employeeId: "EMP012", department: "Engineering" },
    { id: 13, name: "Daniel Robinson", employeeId: "EMP013", department: "Marketing" },
    { id: 14, name: "Lisa Clark", employeeId: "EMP014", department: "Sales" },
    { id: 15, name: "Kevin Rodriguez", employeeId: "EMP015", department: "HR" },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const filteredAttendanceRecords = useMemo(() => {
    return attendanceRecords.filter((record) => {
      const matchesSearch =
        record.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        filterDepartment === "" || record.department === filterDepartment;

      const matchesStatus =
        filterStatus === "" || record.status === filterStatus;

      const matchesDate =
        filterDate === "" || record.date === filterDate;

      return matchesSearch && matchesDepartment && matchesStatus && matchesDate;
    });
  }, [attendanceRecords, searchTerm, filterDepartment, filterStatus, filterDate]);

  const attendancePerPage = 10;
  const totalPages = Math.ceil(filteredAttendanceRecords.length / attendancePerPage);
  const startIndex = (currentPage - 1) * attendancePerPage;
  const endIndex = startIndex + attendancePerPage;
  const currentAttendance = filteredAttendanceRecords.slice(startIndex, endIndex);

  const handleViewAttendance = (attendance) => {
    setSelectedAttendance(attendance);
    setIsViewModalOpen(true);
  };

  const handleEditAttendance = (attendance) => {
    setSelectedAttendance(attendance);
    setIsViewModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleUpdateAttendance = (updatedAttendance) => {
    setAttendanceRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === updatedAttendance.id ? updatedAttendance : record
      )
    );
    setIsEditModalOpen(false);
    setSelectedAttendance(null);
    toast.success("Attendance record updated successfully.");
  };

  const handleDeleteAttendance = (attendance) => {
    setSelectedAttendance(attendance);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteAttendanceConfirm = (attendanceId) => {
    setAttendanceRecords((prevRecords) =>
      prevRecords.filter((record) => record.id !== attendanceId)
    );
    setIsDeleteModalOpen(false);
    setSelectedAttendance(null);
    toast.success("Attendance record deleted successfully.");
  };

  const handleAddAttendance = (newAttendance) => {
    setAttendanceRecords((prev) => [...prev, newAttendance]);
    toast.success("Attendance marked successfully.");
  };

  const handleExportCSV = () => {
    const headers = [
      "Employee",
      "Employee ID",
      "Department",
      "Check In",
      "Check Out",
      "Working Hours",
      "Status",
      "Date",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredAttendanceRecords.map((record) =>
        [
          record.employee,
          record.employeeId,
          record.department,
          record.checkIn,
          record.checkOut,
          record.workingHours,
          record.status,
          record.date,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "attendance_records.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Attendance records exported successfully.");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const stats = [
    {
      title: "Total Employees",
      value: attendanceRecords.length,
      icon: FiUsers,
      color: "#3b82f6",
    },
    {
      title: "Present Today",
      value: attendanceRecords.filter(
        (record) => record.status === "Present"
      ).length,
      icon: FiCheckCircle,
      color: "#10b981",
    },
    {
      title: "Absent Today",
      value: attendanceRecords.filter(
        (record) => record.status === "Absent"
      ).length,
      icon: FiXCircle,
      color: "#ef4444",
    },
    {
      title: "Late Check-ins",
      value: attendanceRecords.filter(
        (record) => record.status === "Late"
      ).length,
      icon: FiClock,
      color: "#f59e0b",
    },
  ];

  return (
    <div className="attendance-container">

      {/* Page Header */}
      <div className="attendance-header">
        <div>
          <h1 className="attendance-title">Attendance Management</h1>
          <p className="attendance-subtitle">
            Monitor employee attendance, working hours and daily records.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="attendance-stats-grid">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="attendance-stat-card"
            style={{ borderTop: `4px solid ${stat.color}` }}
          >
            <div className="attendance-stat-icon">
              <stat.icon size={24} color={stat.color} />
            </div>

            <div className="attendance-stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      <div className="attendance-filter-section">

        <div className="attendance-filter-left">

          <SearchInput
            placeholder="Search employee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
            <option value="Half Day">Half Day</option>
          </select>

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="date-picker"
          />

        </div>

        <div className="attendance-filter-right">

          <button className="export-btn" onClick={handleExportCSV}>
            <FiDownload />
            Export
          </button>

          <button className="mark-attendance-btn" onClick={() => setIsMarkModalOpen(true)}>
            <FiPlus />
            Mark Attendance
          </button>

        </div>

      </div>

      {/* Table */}
      <div className="attendance-table-section">

        {isLoading ? (
          <div className="loading-skeleton">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="skeleton-row"></div>
            ))}
          </div>
        ) : currentAttendance.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FiUsers size={48} />
            </div>
            <h3>No Attendance Records Found</h3>
            <p>
              {filteredAttendanceRecords.length === 0 && (searchTerm || filterDepartment || filterStatus || filterDate)
                ? "Try adjusting your search or filters."
                : "Click Mark Attendance to create your first attendance record."}
            </p>
            <button className="mark-attendance-btn" onClick={() => setIsMarkModalOpen(true)}>
              <FiPlus />
              Mark Attendance
            </button>
          </div>
        ) : (
          <table className="attendance-table">

            <thead>
              <tr>
                <th>Employee</th>
                <th>Employee ID</th>
                <th>Department</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Working Hours</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentAttendance.map((record) => (
                <tr key={record.id}>
                  <td>
                    <div className="employee-cell">
                      <div className="employee-avatar">
                        {record.employee && record.employee.length > 0 ? record.employee.charAt(0) : '?'}
                      </div>
                      <div>
                        <h4>{record.employee || 'N/A'}</h4>
                      </div>
                    </div>
                  </td>

                  <td>{record.employeeId || 'N/A'}</td>

                  <td>{record.department || 'N/A'}</td>

                  <td>{record.checkIn || 'N/A'}</td>

                  <td>{record.checkOut || 'N/A'}</td>

                  <td>{record.workingHours || 'N/A'}</td>

                  <td>
                    <span className={`attendance-status ${record.status ? record.status.toLowerCase().replace(' ', '-') : ''}`}>
                      {record.status || 'N/A'}
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button className="view-btn" onClick={() => handleViewAttendance(record)}>
                        <FiEye />
                      </button>
                      <button className="edit-btn" onClick={() => handleEditAttendance(record)}>
                        <FiEdit />
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteAttendance(record)}>
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
      {filteredAttendanceRecords.length > 0 && (
        <div className="pagination-section">
          <div className="pagination-info">
            Showing {filteredAttendanceRecords.length > 0 ? startIndex + 1 : 0}–{Math.min(endIndex, filteredAttendanceRecords.length)} of {filteredAttendanceRecords.length} Attendance Records
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

      {/* View Attendance Modal */}
      <ViewAttendanceModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        attendanceRecord={selectedAttendance}
      />

      {/* Edit Attendance Modal */}
      <EditAttendanceModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        attendanceRecord={selectedAttendance}
        onUpdateAttendance={handleUpdateAttendance}
        employees={employees}
      />

      {/* Delete Attendance Modal */}
      <DeleteAttendanceModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        attendanceRecord={selectedAttendance}
        onDeleteAttendance={handleDeleteAttendanceConfirm}
      />

      {/* Mark Attendance Modal */}
      <AddAttendanceModal
        isOpen={isMarkModalOpen}
        onClose={() => setIsMarkModalOpen(false)}
        onAddAttendance={handleAddAttendance}
        employees={employees}
      />

    </div>
  );
}

export default Attendance;
