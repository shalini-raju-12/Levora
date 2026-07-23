import React, { useState } from 'react';
import SearchInput from '../components/common/SearchInput';
import '../styles/payroll.css';

function Payroll() {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [payrollData, setPayrollData] = useState([
    {
      id: 'EMP001',
      name: 'John Smith',
      department: 'Engineering',
      basicSalary: 75000,
      allowances: 15000,
      deductions: 8000,
      netSalary: 82000,
      status: 'Paid'
    },
    {
      id: 'EMP002',
      name: 'Sarah Johnson',
      department: 'Marketing',
      basicSalary: 65000,
      allowances: 12000,
      deductions: 6500,
      netSalary: 70500,
      status: 'Paid'
    },
    {
      id: 'EMP003',
      name: 'Michael Brown',
      department: 'Finance',
      basicSalary: 70000,
      allowances: 14000,
      deductions: 7500,
      netSalary: 76500,
      status: 'Processing'
    },
    {
      id: 'EMP004',
      name: 'Emily Davis',
      department: 'Human Resources',
      basicSalary: 55000,
      allowances: 10000,
      deductions: 5000,
      netSalary: 60000,
      status: 'Pending'
    },
    {
      id: 'EMP005',
      name: 'David Wilson',
      department: 'Engineering',
      basicSalary: 80000,
      allowances: 16000,
      deductions: 8500,
      netSalary: 87500,
      status: 'Paid'
    },
    {
      id: 'EMP006',
      name: 'Jessica Martinez',
      department: 'Sales',
      basicSalary: 60000,
      allowances: 11000,
      deductions: 6000,
      netSalary: 65000,
      status: 'Processing'
    },
    {
      id: 'EMP007',
      name: 'Robert Taylor',
      department: 'Operations',
      basicSalary: 58000,
      allowances: 10500,
      deductions: 5500,
      netSalary: 63000,
      status: 'Pending'
    },
    {
      id: 'EMP008',
      name: 'Amanda Anderson',
      department: 'Marketing',
      basicSalary: 62000,
      allowances: 11500,
      deductions: 6200,
      netSalary: 67300,
      status: 'Paid'
    },
    {
      id: 'EMP009',
      name: 'Christopher Thomas',
      department: 'Engineering',
      basicSalary: 85000,
      allowances: 17000,
      deductions: 9000,
      netSalary: 93000,
      status: 'Processing'
    },
    {
      id: 'EMP010',
      name: 'Michelle Garcia',
      department: 'Finance',
      basicSalary: 68000,
      allowances: 13500,
      deductions: 7000,
      netSalary: 74500,
      status: 'Pending'
    }
  ]);

  // Modal states
  const [viewModal, setViewModal] = useState({ isOpen: false, employee: null });
  const [editModal, setEditModal] = useState({ isOpen: false, employee: null });
  const [payslipModal, setPayslipModal] = useState({ isOpen: false, employee: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, employeeId: null });
  const [notification, setNotification] = useState({ isOpen: false, message: '', type: '' });
  const [generatePayslipModal, setGeneratePayslipModal] = useState({ isOpen: false, selectedEmployeeId: '' });
  const [processPayrollModal, setProcessPayrollModal] = useState({ isOpen: false });

  // Calculate summary values
  const totalEmployees = payrollData.length;
  const grossSalary = payrollData.reduce((sum, emp) => sum + emp.basicSalary + emp.allowances, 0);
  const totalDeductions = payrollData.reduce((sum, emp) => sum + emp.deductions, 0);
  const netPayroll = payrollData.reduce((sum, emp) => sum + emp.netSalary, 0);

  // Filter data based on search and filters
  const filteredData = payrollData.filter((emp) => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || emp.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Get unique departments
  const departments = [...new Set(payrollData.map(emp => emp.department))];

  const showNotification = (message, type) => {
    setNotification({ isOpen: true, message, type });
    setTimeout(() => setNotification({ isOpen: false, message: '', type: '' }), 3000);
  };

  const handleProcessPayroll = () => {
    setProcessPayrollModal({ isOpen: true });
  };

  const confirmProcessPayroll = () => {
    setPayrollData(prevData => 
      prevData.map(emp => {
        if (emp.status === 'Pending') {
          return { ...emp, status: 'Processing' };
        } else if (emp.status === 'Processing') {
          return { ...emp, status: 'Paid' };
        }
        return emp;
      })
    );
    setProcessPayrollModal({ isOpen: false });
    showNotification('Payroll processed successfully!', 'success');
  };

  const handleExportPayroll = () => {
    const headers = ['Employee ID', 'Employee Name', 'Department', 'Basic Salary', 'Allowances', 'Deductions', 'Net Salary', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(emp => [
        emp.id,
        emp.name,
        emp.department,
        emp.basicSalary,
        emp.allowances,
        emp.deductions,
        emp.netSalary,
        emp.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `payroll_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    showNotification('Payroll exported successfully!', 'success');
  };

  const handleView = (employee) => {
    setViewModal({ isOpen: true, employee });
  };

  const handleEdit = (employee) => {
    setEditModal({ isOpen: true, employee: { ...employee } });
  };

  const handleDelete = (employeeId) => {
    setDeleteModal({ isOpen: true, employeeId });
  };

  const confirmDelete = () => {
    setPayrollData(prevData => prevData.filter(emp => emp.id !== deleteModal.employeeId));
    setDeleteModal({ isOpen: false, employeeId: null });
    showNotification('Payroll record deleted successfully!', 'success');
  };

  const handleGeneratePayslip = () => {
    console.log("Generate Payslip button clicked");
    setGeneratePayslipModal({ isOpen: true, selectedEmployeeId: '' });
    console.log("State updated:", { isOpen: true, selectedEmployeeId: '' });
  };

  const handleSelectEmployeeForPayslip = () => {
    const employee = payrollData.find(emp => emp.id === generatePayslipModal.selectedEmployeeId);
    if (employee) {
      setGeneratePayslipModal({ isOpen: false, selectedEmployeeId: '' });
      setPayslipModal({ isOpen: true, employee });
    }
  };

  const handleDownloadPDF = () => {
    showNotification('Payslip PDF downloaded!', 'success');
  };

  const handleSaveEdit = () => {
    const updatedEmployee = {
      ...editModal.employee,
      netSalary: editModal.employee.basicSalary + editModal.employee.allowances - editModal.employee.deductions
    };
    setPayrollData(prevData => 
      prevData.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp)
    );
    setEditModal({ isOpen: false, employee: null });
    showNotification('Payroll record updated successfully!', 'success');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Paid':
        return 'status-paid';
      case 'Pending':
        return 'status-pending';
      case 'Processing':
        return 'status-processing';
      default:
        return '';
    }
  };

  const formatCurrency = (amount) => {
    return '₹' + amount.toLocaleString('en-IN');
  };

  const getCurrentMonth = () => {
    const date = new Date();
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'employees', label: 'Employees', icon: '👥' },
    { id: 'attendance', label: 'Attendance', icon: '📅' },
    { id: 'leave', label: 'Leave', icon: '🏖️' },
    { id: 'payroll', label: 'Payroll', icon: '💰', active: true },
    { id: 'departments', label: 'Departments', icon: '🏢' },
    { id: 'calendar', label: 'Calendar', icon: '📆' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="payroll-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-logo">Levora</h2>
          <p className="sidebar-tagline">HR Management</p>
        </div>
        <nav className="sidebar-nav">
          {sidebarItems.map(item => (
            <a key={item.id} href="#" className={`sidebar-item ${item.active ? 'active' : ''}`}>
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">AD</div>
            <div className="user-details">
              <p className="user-name">Admin User</p>
              <p className="user-role">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <header className="navbar">
          <div className="navbar-left">
            <h1 className="page-title">Payroll Management</h1>
            <p className="page-subtitle">Current Payroll Month: {getCurrentMonth()}</p>
          </div>
          <div className="navbar-right">
            <button className="btn btn-generate" onClick={handleGeneratePayslip}>
              Generate Payslip
            </button>
            <button className="btn btn-export" onClick={handleExportPayroll}>
              Export Payroll
            </button>
            <button className="btn btn-process" onClick={handleProcessPayroll}>
              Process Payroll
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="content-wrapper">
          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card employees">
              <div className="card-icon">👥</div>
              <div className="card-content">
                <div className="card-label">Total Employees</div>
                <div className="card-value">{totalEmployees}</div>
              </div>
            </div>
            <div className="summary-card gross">
              <div className="card-icon">💰</div>
              <div className="card-content">
                <div className="card-label">Gross Salary</div>
                <div className="card-value">{formatCurrency(grossSalary)}</div>
              </div>
            </div>
            <div className="summary-card deductions">
              <div className="card-icon">📉</div>
              <div className="card-content">
                <div className="card-label">Total Deductions</div>
                <div className="card-value">{formatCurrency(totalDeductions)}</div>
              </div>
            </div>
            <div className="summary-card net">
              <div className="card-icon">💵</div>
              <div className="card-content">
                <div className="card-label">Net Payroll</div>
                <div className="card-value">{formatCurrency(netPayroll)}</div>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="filters-section">
            <div className="filters-row">
              <SearchInput
                placeholder="Search by name or employee ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="filter-select"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
              </select>
            </div>
          </div>

          {/* Payroll Table */}
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Department</th>
                  <th>Basic Salary</th>
                  <th>Allowances</th>
                  <th>Deductions</th>
                  <th>Net Salary</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.department}</td>
                    <td>{formatCurrency(employee.basicSalary)}</td>
                    <td>{formatCurrency(employee.allowances)}</td>
                    <td>{formatCurrency(employee.deductions)}</td>
                    <td>{formatCurrency(employee.netSalary)}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon btn-view"
                          onClick={() => handleView(employee)}
                          data-tooltip="View Details"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                        <button
                          className="btn-icon btn-edit"
                          onClick={() => handleEdit(employee)}
                          data-tooltip="Edit Record"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button
                          className="btn-icon btn-delete"
                          onClick={() => handleDelete(employee.id)}
                          data-tooltip="Delete Record"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredData.length === 0 && (
              <div className="no-data">
                No records found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Modal */}
      {viewModal.isOpen && (
        <div className="modal-overlay" onClick={() => setViewModal({ isOpen: false, employee: null })}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Payroll Details</h3>
              <button className="modal-close" onClick={() => setViewModal({ isOpen: false, employee: null })}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Employee ID:</span>
                <span className="detail-value">{viewModal.employee?.id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Employee Name:</span>
                <span className="detail-value">{viewModal.employee?.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Department:</span>
                <span className="detail-value">{viewModal.employee?.department}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Basic Salary:</span>
                <span className="detail-value">{formatCurrency(viewModal.employee?.basicSalary)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Allowances:</span>
                <span className="detail-value">{formatCurrency(viewModal.employee?.allowances)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Deductions:</span>
                <span className="detail-value">{formatCurrency(viewModal.employee?.deductions)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Net Salary:</span>
                <span className="detail-value">{formatCurrency(viewModal.employee?.netSalary)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`status-badge ${getStatusBadgeClass(viewModal.employee?.status)}`}>
                  {viewModal.employee?.status}
                </span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setViewModal({ isOpen: false, employee: null })}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal.isOpen && (
        <div className="modal-overlay" onClick={() => setEditModal({ isOpen: false, employee: null })}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Payroll Record</h3>
              <button className="modal-close" onClick={() => setEditModal({ isOpen: false, employee: null })}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Employee ID</label>
                <input type="text" value={editModal.employee?.id} disabled />
              </div>
              <div className="form-group">
                <label>Employee Name</label>
                <input type="text" value={editModal.employee?.name} disabled />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input type="text" value={editModal.employee?.department} disabled />
              </div>
              <div className="form-group">
                <label>Basic Salary</label>
                <input
                  type="number"
                  value={editModal.employee?.basicSalary}
                  onChange={(e) => setEditModal({
                    ...editModal,
                    employee: { ...editModal.employee, basicSalary: parseInt(e.target.value) }
                  })}
                />
              </div>
              <div className="form-group">
                <label>Allowances</label>
                <input
                  type="number"
                  value={editModal.employee?.allowances}
                  onChange={(e) => setEditModal({
                    ...editModal,
                    employee: { ...editModal.employee, allowances: parseInt(e.target.value) }
                  })}
                />
              </div>
              <div className="form-group">
                <label>Deductions</label>
                <input
                  type="number"
                  value={editModal.employee?.deductions}
                  onChange={(e) => setEditModal({
                    ...editModal,
                    employee: { ...editModal.employee, deductions: parseInt(e.target.value) }
                  })}
                />
              </div>
              <div className="form-group">
                <label>Net Salary (Auto-calculated)</label>
                <input
                  type="text"
                  value={formatCurrency(editModal.employee?.basicSalary + editModal.employee?.allowances - editModal.employee?.deductions)}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={editModal.employee?.status}
                  onChange={(e) => setEditModal({
                    ...editModal,
                    employee: { ...editModal.employee, status: e.target.value }
                  })}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setEditModal({ isOpen: false, employee: null })}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveEdit}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payslip Modal */}
      {payslipModal.isOpen && (
        <div className="modal-overlay" onClick={() => setPayslipModal({ isOpen: false, employee: null })}>
          <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Payslip - {getCurrentMonth()}</h3>
              <button className="modal-close" onClick={() => setPayslipModal({ isOpen: false, employee: null })}>
                ✕
              </button>
            </div>
            <div className="modal-body payslip-content">
              <div className="payslip-header">
                <div className="payslip-company">
                  <h2>Levora HR</h2>
                  <p>Human Resource Management System</p>
                </div>
                <div className="payslip-period">
                  <p><strong>Pay Period:</strong> {getCurrentMonth()}</p>
                  <p><strong>Payslip Date:</strong> {new Date().toLocaleDateString()}</p>
                </div>
              </div>
              <div className="payslip-employee">
                <h4>Employee Information</h4>
                <div className="employee-details">
                  <p><strong>Employee ID:</strong> {payslipModal.employee?.id}</p>
                  <p><strong>Name:</strong> {payslipModal.employee?.name}</p>
                  <p><strong>Department:</strong> {payslipModal.employee?.department}</p>
                </div>
              </div>
              <div className="payslip-earnings">
                <h4>Earnings</h4>
                <table className="payslip-table">
                  <tbody>
                    <tr>
                      <td>Basic Salary</td>
                      <td className="amount">{formatCurrency(payslipModal.employee?.basicSalary)}</td>
                    </tr>
                    <tr>
                      <td>Allowances</td>
                      <td className="amount">{formatCurrency(payslipModal.employee?.allowances)}</td>
                    </tr>
                    <tr className="total">
                      <td><strong>Gross Earnings</strong></td>
                      <td className="amount"><strong>{formatCurrency(payslipModal.employee?.basicSalary + payslipModal.employee?.allowances)}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="payslip-deductions">
                <h4>Deductions</h4>
                <table className="payslip-table">
                  <tbody>
                    <tr>
                      <td>Total Deductions</td>
                      <td className="amount">{formatCurrency(payslipModal.employee?.deductions)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="payslip-net">
                <h4>Net Pay</h4>
                <div className="net-amount">
                  <span className="net-label">Net Salary:</span>
                  <span className="net-value">{formatCurrency(payslipModal.employee?.netSalary)}</span>
                </div>
              </div>
              <div className="payslip-footer">
                <p>This is a computer-generated payslip. No signature required.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setPayslipModal({ isOpen: false, employee: null })}>
                Close
              </button>
              <button className="btn btn-export" onClick={handleDownloadPDF}>
                Download PDF
              </button>
              <button className="btn btn-primary" onClick={() => {
                window.print();
                showNotification('Payslip sent to printer!', 'success');
              }}>
                Print Payslip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generate Payslip Selection Modal */}
      {generatePayslipModal.isOpen && (
        <div className="modal-overlay" onClick={() => setGeneratePayslipModal({ isOpen: false, selectedEmployeeId: '' })}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Generate Payslip</h3>
              <button className="modal-close" onClick={() => setGeneratePayslipModal({ isOpen: false, selectedEmployeeId: '' })}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Select Employee</label>
                <select
                  value={generatePayslipModal.selectedEmployeeId}
                  onChange={(e) => setGeneratePayslipModal({ ...generatePayslipModal, selectedEmployeeId: e.target.value })}
                >
                  <option value="">-- Select an Employee --</option>
                  {payrollData.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name} ({employee.id}) - {employee.department}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setGeneratePayslipModal({ isOpen: false, selectedEmployeeId: '' })}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleSelectEmployeeForPayslip}
                disabled={!generatePayslipModal.selectedEmployeeId}
              >
                Generate Payslip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Process Payroll Confirmation Modal */}
      {processPayrollModal.isOpen && (
        <div className="modal-overlay" onClick={() => setProcessPayrollModal({ isOpen: false })}>
          <div className="modal modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Process Payroll</h3>
              <button className="modal-close" onClick={() => setProcessPayrollModal({ isOpen: false })}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to process payroll for all employees?</p>
              <p className="info-text">This will update Pending employees to Processing, and Processing employees to Paid.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setProcessPayrollModal({ isOpen: false })}>
                Cancel
              </button>
              <button className="btn btn-process" onClick={confirmProcessPayroll}>
                Process Payroll
 </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="modal-overlay" onClick={() => setDeleteModal({ isOpen: false, employeeId: null })}>
          <div className="modal modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Delete</h3>
              <button className="modal-close" onClick={() => setDeleteModal({ isOpen: false, employeeId: null })}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this payroll record?</p>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteModal({ isOpen: false, employeeId: null })}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification.isOpen && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default Payroll;
