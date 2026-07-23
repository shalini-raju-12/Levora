import { FiPlus, FiFilter, FiDownload, FiEye, FiEdit, FiTrash2, FiUsers, FiUserCheck, FiBriefcase, FiUserPlus, FiUser } from "react-icons/fi";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEmployeeModal from "../components/employee/AddEmployeeModal";
import ViewEmployeeModal from "../components/employee/ViewEmployeeModal";
import EditEmployeeModal from "../components/employee/EditEmployeeModal";
import DeleteEmployeeModal from "../components/employee/DeleteEmployeeModal";
import SearchInput from "../components/common/SearchInput";
import "../styles/employees.css";
import "../styles/add-employee-modal.css";
import "../styles/view-employee-modal.css";
import "../styles/edit-employee-modal.css";
import "../styles/delete-employee-modal.css";

function Employees() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState([
    {
      id: 1,
      employeeId: "EMP001",
      name: "John Smith",
      department: "Engineering",
      designation: "Senior Developer",
      email: "john.smith@levora.com",
      phone: "+1 234 567 8901",
      joiningDate: "15 Jan 2024",
      status: "Active",
      profile: "JS",
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Sarah Johnson",
      department: "Marketing",
      designation: "Marketing Manager",
      email: "sarah.johnson@levora.com",
      phone: "+1 234 567 8902",
      joiningDate: "20 Feb 2024",
      status: "Active",
      profile: "SJ",
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "Michael Brown",
      department: "HR",
      designation: "HR Specialist",
      email: "michael.brown@levora.com",
      phone: "+1 234 567 8903",
      joiningDate: "10 Mar 2024",
      status: "On Leave",
      profile: "MB",
    },
    {
      id: 4,
      employeeId: "EMP004",
      name: "Emily Davis",
      department: "Finance",
      designation: "Financial Analyst",
      email: "emily.davis@levora.com",
      phone: "+1 234 567 8904",
      joiningDate: "05 Apr 2024",
      status: "Active",
      profile: "ED",
    },
    {
      id: 5,
      employeeId: "EMP005",
      name: "David Wilson",
      department: "Engineering",
      designation: "DevOps Engineer",
      email: "david.wilson@levora.com",
      phone: "+1 234 567 8905",
      joiningDate: "12 May 2024",
      status: "Active",
      profile: "DW",
    },
    {
      id: 6,
      employeeId: "EMP006",
      name: "Jennifer Taylor",
      department: "Sales",
      designation: "Sales Executive",
      email: "jennifer.taylor@levora.com",
      phone: "+1 234 567 8906",
      joiningDate: "18 Jun 2024",
      status: "Inactive",
      profile: "JT",
    },
    {
      id: 7,
      employeeId: "EMP007",
      name: "Robert Anderson",
      department: "Engineering",
      designation: "Tech Lead",
      email: "robert.anderson@levora.com",
      phone: "+1 234 567 8907",
      joiningDate: "22 Jul 2024",
      status: "Active",
      profile: "RA",
    },
    {
      id: 8,
      employeeId: "EMP008",
      name: "Lisa Martinez",
      department: "Marketing",
      designation: "Content Writer",
      email: "lisa.martinez@levora.com",
      phone: "+1 234 567 8908",
      joiningDate: "01 Aug 2024",
      status: "Active",
      profile: "LM",
    },
    {
      id: 9,
      employeeId: "EMP009",
      name: "James Thomas",
      department: "Operations",
      designation: "Operations Manager",
      email: "james.thomas@levora.com",
      phone: "+1 234 567 8909",
      joiningDate: "15 Sep 2024",
      status: "On Leave",
      profile: "JT",
    },
    {
      id: 10,
      employeeId: "EMP010",
      name: "Amanda Garcia",
      department: "HR",
      designation: "Recruiter",
      email: "amanda.garcia@levora.com",
      phone: "+1 234 567 8910",
      joiningDate: "20 Oct 2024",
      status: "Active",
      profile: "AG",
    },
    {
      id: 11,
      employeeId: "EMP011",
      name: "Christopher Lee",
      department: "Finance",
      designation: "Accountant",
      email: "christopher.lee@levora.com",
      phone: "+1 234 567 8911",
      joiningDate: "05 Nov 2024",
      status: "Active",
      profile: "CL",
    },
    {
      id: 12,
      employeeId: "EMP012",
      name: "Michelle White",
      department: "Sales",
      designation: "Sales Manager",
      email: "michelle.white@levora.com",
      phone: "+1 234 567 8912",
      joiningDate: "10 Dec 2024",
      status: "Active",
      profile: "MW",
    },
  ]);

  const stats = [
    {
      title: "Total Employees",
      value: employees.length.toString(),
      growth: "+12% this month",
      icon: FiUsers,
      color: "#3b82f6",
    },
    {
      title: "Active Employees",
      value: employees.filter((e) => e.status === "Active").length.toString(),
      growth: "89% Active",
      icon: FiUserCheck,
      color: "#10b981",
    },
    {
      title: "Departments",
      value: [...new Set(employees.map((e) => e.department))].length.toString(),
      growth: "+2 New",
      icon: FiBriefcase,
      color: "#F4C542",
    },
    {
      title: "New Joiners",
      value: "15",
      growth: "+5 this week",
      icon: FiUserPlus,
      color: "#8b5cf6",
    },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment =
        filterDepartment === "" || employee.department === filterDepartment;
      const matchesStatus = filterStatus === "" || employee.status === filterStatus;
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [employees, searchTerm, filterDepartment, filterStatus]);

  const employeesPerPage = 10;
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const startIndex = (currentPage - 1) * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const handleExportCSV = () => {
    const headers = [
      "Employee ID",
      "Name",
      "Department",
      "Designation",
      "Email",
      "Phone",
      "Joining Date",
      "Status",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredEmployees.map((emp) =>
        [
          emp.employeeId,
          emp.name,
          emp.department,
          emp.designation,
          emp.email,
          emp.phone,
          emp.joiningDate,
          emp.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "employees.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Employees exported successfully.");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      Active: "status-active",
      "On Leave": "status-on-leave",
      Inactive: "status-inactive",
    };
    return statusClasses[status] || "";
  };

  const getProfileColor = (name) => {
    const colors = ["#3b82f6", "#10b981", "#F4C542", "#8b5cf6", "#ef4444", "#f59e0b"];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleDeleteEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
  };

  const handleDeleteEmployeeConfirm = (employeeId) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((emp) => emp.id !== employeeId)
    );
    toast.success("Employee deleted successfully.");
  };

  return (
    <div className="employees-container">
      {/* Page Header */}
      <div className="employees-header">
        <div>
          <h1 className="employees-title">Employee Management</h1>
          <p className="employees-subtitle">Manage employee records, departments, and work information.</p>
        </div>
        <button className="add-employee-btn" onClick={() => setIsModalOpen(true)}>
          <FiPlus size={18} />
          Add Employee
        </button>
      </div>

      {/* Statistics Cards */}
      {isLoading ? (
        <div className="employees-stats-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-icon"></div>
              <div className="skeleton-content">
                <div className="skeleton-value"></div>
                <div className="skeleton-title"></div>
                <div className="skeleton-growth"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="employees-stats-grid">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="employee-stat-card"
              style={{
                "--stat-color": stat.color,
                "--stat-color-light": `${stat.color}40`,
              }}
            >
              <div className="employee-stat-icon-wrapper">
                <stat.icon className="employee-stat-icon" size={24} />
              </div>
              <div className="employee-stat-content">
                <h3 className="employee-stat-value">{stat.value}</h3>
                <p className="employee-stat-title">{stat.title}</p>
                <span className="employee-stat-growth">{stat.growth}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Search & Filter Section */}
      <div className="employees-filter-section">
        <div className="employees-filter-left">
          <SearchInput
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            className="filter-select"
            value={filterDepartment}
            onChange={(e) => {
              setFilterDepartment(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Sales">Sales</option>
            <option value="Operations">Operations</option>
          </select>
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="employees-filter-right">
          <button className="export-btn" onClick={handleExportCSV}>
            <FiDownload size={16} />
            Export Employees
          </button>
          <button className="add-employee-btn-small" onClick={() => setIsModalOpen(true)}>
            <FiPlus size={16} />
            Add Employee
          </button>
        </div>
      </div>

      {/* Employee Table */}
      {isLoading ? (
        <div className="employees-table-section">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton-table-row"></div>
          ))}
        </div>
      ) : currentEmployees.length === 0 ? (
        <div className="employees-empty-state">
          <div className="empty-state-illustration">
            <FiUser className="empty-state-icon" size={48} />
          </div>
          <h3 className="empty-state-title">No Employees Found</h3>
          <p className="empty-state-subtitle">
            {filteredEmployees.length === 0 && (searchTerm || filterDepartment || filterStatus)
              ? "Try adjusting your search or filters."
              : "Click Add Employee to create your first employee."}
          </p>
          <button className="empty-state-btn" onClick={() => setIsModalOpen(true)}>
            <FiPlus size={16} />
            Add Employee
          </button>
        </div>
      ) : (
        <div className="employees-table-section">
          <div className="table-responsive">
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Joining Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div className="employee-profile" style={{ backgroundColor: getProfileColor(employee.name) }}>
                        {employee.profile}
                      </div>
                    </td>
                    <td className="employee-id">{employee.employeeId}</td>
                    <td className="employee-name">{employee.name}</td>
                    <td className="employee-department">{employee.department}</td>
                    <td className="employee-designation">{employee.designation}</td>
                    <td className="employee-email">{employee.email}</td>
                    <td className="employee-phone">{employee.phone}</td>
                    <td className="employee-joining-date">{employee.joiningDate}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadge(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn view-btn" title="View" onClick={() => handleViewEmployee(employee)}>
                          <FiEye size={16} />
                        </button>
                        <button className="action-btn edit-btn" title="Edit" onClick={() => handleEditEmployee(employee)}>
                          <FiEdit size={16} />
                        </button>
                        <button
                        className="action-btn delete-btn"
                        title="Delete"
                        onClick={() => handleDeleteEmployee(employee)}
                        >
                          <FiTrash2 size={16} />
</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mobile Employee Cards */}
      {isLoading ? (
        <div className="employees-mobile-cards">
          {[1, 2, 3].map((i) => (
            <div key={i} className="employee-mobile-card">
              <div className="skeleton-table-row"></div>
            </div>
          ))}
        </div>
      ) : currentEmployees.length === 0 ? null : (
        <div className="employees-mobile-cards">
          {currentEmployees.map((employee) => (
            <div key={employee.id} className="employee-mobile-card">
              <div className="employee-mobile-header">
                <div
                  className="employee-mobile-avatar"
                  style={{ backgroundColor: getProfileColor(employee.name) }}
                >
                  {employee.profile}
                </div>
                <div className="employee-mobile-info">
                  <h4 className="employee-mobile-name">{employee.name}</h4>
                  <p className="employee-mobile-id">{employee.employeeId}</p>
                </div>
              </div>
              <div className="employee-mobile-details">
                <div className="employee-mobile-detail">
                  <span className="employee-mobile-detail-label">Department</span>
                  <span className="employee-mobile-detail-value">{employee.department}</span>
                </div>
                <div className="employee-mobile-detail">
                  <span className="employee-mobile-detail-label">Designation</span>
                  <span className="employee-mobile-detail-value">{employee.designation}</span>
                </div>
                <div className="employee-mobile-detail">
                  <span className="employee-mobile-detail-label">Status</span>
                  <span className={`status-badge ${getStatusBadge(employee.status)}`}>
                    {employee.status}
                  </span>
                </div>
                <div className="employee-mobile-detail">
                  <span className="employee-mobile-detail-label">Email</span>
                  <span className="employee-mobile-detail-value">{employee.email}</span>
                </div>
              </div>
              <div className="employee-mobile-actions">
                <button
                  className="employee-mobile-action-btn view"
                  onClick={() => handleViewEmployee(employee)}
                >
                  <FiEye size={14} />
                  View
                </button>
                <button
                  className="employee-mobile-action-btn edit"
                  onClick={() => handleEditEmployee(employee)}
                >
                  <FiEdit size={14} />
                  Edit
                </button>
                <button
                  className="employee-mobile-action-btn delete"
                  onClick={() => handleDeleteEmployee(employee)}
                >
                  <FiTrash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="employees-pagination">
        <div className="pagination-info">
          Showing {filteredEmployees.length > 0 ? startIndex + 1 : 0}–{Math.min(endIndex, filteredEmployees.length)} of {filteredEmployees.length} Employees
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

      {/* Add Employee Modal */}
      <AddEmployeeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* View Employee Modal */}
      <ViewEmployeeModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        employee={selectedEmployee}
      />

      {/* Edit Employee Modal */}
      <EditEmployeeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        employee={selectedEmployee}
        onUpdateEmployee={handleUpdateEmployee}
      />
      {/* Delete Employee Modal */}
      <DeleteEmployeeModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee}
        onDeleteEmployee={handleDeleteEmployeeConfirm}
      />
    </div>
  );
  
}

export default Employees;

