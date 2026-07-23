import { FiPlus, FiDownload, FiEye, FiEdit, FiTrash2, FiBriefcase, FiUsers, FiUserCheck, FiMapPin, FiCalendar } from "react-icons/fi";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddDepartmentModal from "../components/department/AddDepartmentModal";
import ViewDepartmentModal from "../components/department/ViewDepartmentModal";
import EditDepartmentModal from "../components/department/EditDepartmentModal";
import DeleteDepartmentModal from "../components/department/DeleteDepartmentModal";
import SearchInput from "../components/common/SearchInput";
import "../styles/departments.css";
import "../styles/add-department-modal.css";
import "../styles/view-department-modal.css";
import "../styles/edit-department-modal.css";
import "../styles/delete-department-modal.css";

function Departments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Human Resources",
      code: "HR001",
      head: "Sarah Johnson",
      employees: 12,
      location: "New York, USA",
      status: "Active",
      createdDate: "15 Jan 2024",
    },
    {
      id: 2,
      name: "Finance",
      code: "FIN001",
      head: "Michael Chen",
      employees: 18,
      location: "New York, USA",
      status: "Active",
      createdDate: "20 Jan 2024",
    },
    {
      id: 3,
      name: "Information Technology",
      code: "IT001",
      head: "David Wilson",
      employees: 45,
      location: "San Francisco, USA",
      status: "Active",
      createdDate: "25 Jan 2024",
    },
    {
      id: 4,
      name: "Marketing",
      code: "MKT001",
      head: "Emily Brown",
      employees: 22,
      location: "Los Angeles, USA",
      status: "Active",
      createdDate: "01 Feb 2024",
    },
    {
      id: 5,
      name: "Sales",
      code: "SAL001",
      head: "James Miller",
      employees: 35,
      location: "Chicago, USA",
      status: "Active",
      createdDate: "10 Feb 2024",
    },
    {
      id: 6,
      name: "Operations",
      code: "OPS001",
      head: "Lisa Anderson",
      employees: 28,
      location: "Houston, USA",
      status: "Active",
      createdDate: "15 Feb 2024",
    },
    {
      id: 7,
      name: "Customer Support",
      code: "CS001",
      head: "Robert Taylor",
      employees: 40,
      location: "Austin, USA",
      status: "Active",
      createdDate: "20 Feb 2024",
    },
    {
      id: 8,
      name: "Administration",
      code: "ADM001",
      head: "Jennifer Davis",
      employees: 15,
      location: "New York, USA",
      status: "Active",
      createdDate: "01 Mar 2024",
    },
    {
      id: 9,
      name: "Research & Development",
      code: "RD001",
      head: "William Martinez",
      employees: 30,
      location: "Boston, USA",
      status: "Active",
      createdDate: "10 Mar 2024",
    },
    {
      id: 10,
      name: "Legal",
      code: "LEG001",
      head: "Amanda White",
      employees: 8,
      location: "New York, USA",
      status: "Active",
      createdDate: "15 Mar 2024",
    },
  ]);

  const stats = [
    {
      title: "Total Departments",
      value: departments.length.toString(),
      growth: "+2 this quarter",
      icon: FiBriefcase,
      color: "#3b82f6",
    },
    {
      title: "Total Employees",
      value: departments.reduce((sum, dept) => sum + dept.employees, 0).toString(),
      growth: "+15% this month",
      icon: FiUsers,
      color: "#10b981",
    },
    {
      title: "Department Heads",
      value: departments.length.toString(),
      growth: "100% Assigned",
      icon: FiUserCheck,
      color: "#F4C542",
    },
    {
      title: "Avg Employees/Dept",
      value: Math.round(departments.reduce((sum, dept) => sum + dept.employees, 0) / departments.length).toString(),
      growth: "+3% increase",
      icon: FiUsers,
      color: "#8b5cf6",
    },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const filteredDepartments = useMemo(() => {
    return departments.filter((department) => {
      const matchesSearch =
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "" || department.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [departments, searchTerm, filterStatus]);

  const departmentsPerPage = 5;
  const totalPages = Math.ceil(filteredDepartments.length / departmentsPerPage);
  const startIndex = (currentPage - 1) * departmentsPerPage;
  const endIndex = startIndex + departmentsPerPage;
  const currentDepartments = filteredDepartments.slice(startIndex, endIndex);

  const handleExportCSV = () => {
    const headers = [
      "Department Name",
      "Department Code",
      "Department Head",
      "Number of Employees",
      "Location",
      "Status",
      "Created Date",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredDepartments.map((dept) =>
        [
          dept.name,
          dept.code,
          dept.head,
          dept.employees,
          dept.location,
          dept.status,
          dept.createdDate,
        ].join(",")
      ),
    ].join("\n");
const blob = new Blob([csvContent], {
  type: "text/csv;charset=utf-8;",
});

const link = document.createElement("a");
const url = URL.createObjectURL(blob);

const today = new Date().toISOString().split("T")[0];

link.setAttribute("href", url);
link.setAttribute(
  "download",
  `Levora_Departments_${today}.csv`
);

link.style.visibility = "hidden";
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
    toast.success("Departments exported successfully.");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddDepartment = (newDepartment) => {
    setDepartments((prevDepartments) => [...prevDepartments, newDepartment]);
    toast.success("Department added successfully.");
  };

  const handleViewDepartment = (department) => {
    setSelectedDepartment(department);
    setIsViewModalOpen(true);
  };

  const handleEditDepartment = (department) => {
    setSelectedDepartment(department);
    setIsViewModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleUpdateDepartment = (updatedDepartment) => {
    setDepartments((prevDepartments) =>
      prevDepartments.map((dept) =>
        dept.id === updatedDepartment.id ? updatedDepartment : dept
      )
    );
    toast.success("Department updated successfully.");
  };

  const handleDeleteDepartment = (department) => {
    setSelectedDepartment(department);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteDepartmentConfirm = (departmentId) => {
    setDepartments((prevDepartments) =>
      prevDepartments.filter((dept) => dept.id !== departmentId)
    );
    setIsDeleteModalOpen(false);
    setSelectedDepartment(null);
    toast.success("Department deleted successfully.");
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      Active: "status-active",
      Inactive: "status-inactive",
    };
    return statusClasses[status] || "";
  };

  const getDepartmentColor = (name) => {
    const colors = ["#3b82f6", "#10b981", "#F4C542", "#8b5cf6", "#ef4444", "#f59e0b"];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="departments-container">
      {/* Page Header */}
      <div className="departments-header">
        <div>
          <h1 className="departments-title">Department Management</h1>
          <p className="departments-subtitle">Manage departments, teams, and organizational structure.</p>
        </div>
        
      </div>

      {/* Statistics Cards */}
      {isLoading ? (
        <div className="departments-stats-grid">
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
        <div className="departments-stats-grid">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="department-stat-card"
              style={{
                "--stat-color": stat.color,
                "--stat-color-light": `${stat.color}40`,
              }}
            >
              <div className="department-stat-icon-wrapper">
                <stat.icon className="department-stat-icon" size={24} />
              </div>
              <div className="department-stat-content">
                <h3 className="department-stat-value">{stat.value}</h3>
                <p className="department-stat-title">{stat.title}</p>
                <span className="department-stat-growth">{stat.growth}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Search & Filter Section */}
      <div className="departments-filter-section">
        <div className="departments-filter-left">
          <SearchInput
            placeholder="Search department..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
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
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="departments-filter-right">
          <button className="export-btn" onClick={handleExportCSV}>
            <FiDownload size={16} />
            Export Departments
          </button>
          <button
  className="clear-filter-btn"
  onClick={() => {
    setSearchTerm("");
    setFilterStatus("");
    setCurrentPage(1);
  }}
>
  Clear Filters
</button>
          <button className="add-department-btn-small" onClick={() => setIsModalOpen(true)}>
            <FiPlus size={16} />
            Add Department
          </button>
        </div>
      </div>

      {/* Department Table */}
      {isLoading ? (
        <div className="departments-table-section">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton-table-row"></div>
          ))}
        </div>
      ) : currentDepartments.length === 0 ? (
        <div className="departments-empty-state">
          <div className="empty-state-illustration">
            <FiBriefcase className="empty-state-icon" size={48} />
          </div>
          <h3 className="empty-state-title">No Departments Found</h3>
          <p className="empty-state-subtitle">
            {filteredDepartments.length === 0 && (searchTerm || filterStatus)
              ? "Try adjusting your search or filters."
              : "Click Add Department to create your first department."}
          </p>
          <button className="empty-state-btn" onClick={() => setIsModalOpen(true)}>
            <FiPlus size={16} />
            Add Department
          </button>
        </div>
      ) : (
        <div className="departments-table-section">
          <div className="table-responsive">
            <table className="departments-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Department Code</th>
                  <th>Department Head</th>
                  <th>Employees</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Created Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentDepartments.map((department) => (
                  <tr key={department.id}>
                    <td>
                      <div className="department-name-cell">
                        <div
                          className="department-avatar"
                          style={{ backgroundColor: getDepartmentColor(department.name) }}
                        >
                          {getInitials(department.name)}
                        </div>
                        <span className="department-name">{department.name}</span>
                      </div>
                    </td>
                    <td className="department-code">{department.code}</td>
                    <td className="department-head">{department.head}</td>
                    <td className="department-employees">
                      <div className="employees-count">
                        <FiUsers size={14} />
                        {department.employees}
                      </div>
                    </td>
                    <td className="department-location">
                      <div className="location-cell">
                        <FiMapPin size={14} />
                        {department.location}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusBadge(department.status)}`}>
                        {department.status}
                      </span>
                    </td>
                    <td className="department-created-date">{department.createdDate}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn view-btn" title="View" onClick={() => handleViewDepartment(department)}>
                          <FiEye size={16} />
                        </button>
                        <button className="action-btn edit-btn" title="Edit" onClick={() => handleEditDepartment(department)}>
                          <FiEdit size={16} />
                        </button>
                        <button className="action-btn delete-btn" title="Delete" onClick={() => handleDeleteDepartment(department)}>
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

      {/* Mobile Department Cards */}
      {isLoading ? (
        <div className="departments-mobile-cards">
          {[1, 2, 3].map((i) => (
            <div key={i} className="department-mobile-card">
              <div className="skeleton-table-row"></div>
            </div>
          ))}
        </div>
      ) : currentDepartments.length === 0 ? null : (
        <div className="departments-mobile-cards">
          {currentDepartments.map((department) => (
            <div key={department.id} className="department-mobile-card">
              <div className="department-mobile-header">
                <div
                  className="department-mobile-avatar"
                  style={{ backgroundColor: getDepartmentColor(department.name) }}
                >
                  {getInitials(department.name)}
                </div>
                <div className="department-mobile-info">
                  <h4 className="department-mobile-name">{department.name}</h4>
                  <p className="department-mobile-code">{department.code}</p>
                </div>
              </div>
              <div className="department-mobile-details">
                <div className="department-mobile-detail">
                  <span className="department-mobile-detail-label">Head</span>
                  <span className="department-mobile-detail-value">{department.head}</span>
                </div>
                <div className="department-mobile-detail">
                  <span className="department-mobile-detail-label">Employees</span>
                  <span className="department-mobile-detail-value">{department.employees}</span>
                </div>
                <div className="department-mobile-detail">
                  <span className="department-mobile-detail-label">Location</span>
                  <span className="department-mobile-detail-value">{department.location}</span>
                </div>
                <div className="department-mobile-detail">
                  <span className="department-mobile-detail-label">Status</span>
                  <span className={`status-badge ${getStatusBadge(department.status)}`}>
                    {department.status}
                  </span>
                </div>
              </div>
              <div className="department-mobile-actions">
                <button className="department-mobile-action-btn view" onClick={() => handleViewDepartment(department)}>
                  <FiEye size={14} />
                  View
                </button>
                <button className="department-mobile-action-btn edit" onClick={() => handleEditDepartment(department)}>
                  <FiEdit size={14} />
                  Edit
                </button>
                <button className="department-mobile-action-btn delete" onClick={() => handleDeleteDepartment(department)}>
                  <FiTrash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="departments-pagination">
        <div className="pagination-info">
          Showing {filteredDepartments.length > 0 ? startIndex + 1 : 0}–{Math.min(endIndex, filteredDepartments.length)} of {filteredDepartments.length} Departments
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

      {/* Add Department Modal */}
      <AddDepartmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddDepartment={handleAddDepartment}
        existingDepartments={departments}
      />

      {/* View Department Modal */}
      <ViewDepartmentModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        department={selectedDepartment}
        onEdit={handleEditDepartment}
      />

      {/* Edit Department Modal */}
      <EditDepartmentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        department={selectedDepartment}
        onUpdateDepartment={handleUpdateDepartment}
        existingDepartments={departments}
      />
      <DeleteDepartmentModal
  isOpen={isDeleteModalOpen}
  onClose={() => {
    setIsDeleteModalOpen(false);
    setSelectedDepartment(null);
  }}
  department={selectedDepartment}
  onDeleteDepartment={handleDeleteDepartmentConfirm}
/>
    </div>
  );
}

export default Departments;

