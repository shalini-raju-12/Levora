import React, { useState, useMemo } from 'react';
import '../styles/calendar.css';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [today, setToday] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  
  // Modal states
  const [viewEventModal, setViewEventModal] = useState({ isOpen: false, event: null });
  const [addEventModal, setAddEventModal] = useState({ isOpen: false, event: null });
  const [deleteEventModal, setDeleteEventModal] = useState({ isOpen: false, eventId: null });
  const [notification, setNotification] = useState({ isOpen: false, message: '', type: '' });

  // Sample HR Events Data
  const [events, setEvents] = useState([
    {
      id: 'EVT001',
      title: 'New Year Holiday',
      eventType: 'Holiday',
      department: 'All Departments',
      date: '2026-01-01',
      startTime: '00:00',
      endTime: '23:59',
      description: 'Company-wide holiday for New Year celebration',
      organizer: 'HR Department',
      status: 'Approved'
    },
    {
      id: 'EVT002',
      title: 'Q1 Planning Meeting',
      eventType: 'Meeting',
      department: 'Management',
      date: '2026-01-15',
      startTime: '09:00',
      endTime: '12:00',
      description: 'Quarterly planning and strategy meeting for all managers',
      organizer: 'CEO Office',
      status: 'Approved'
    },
    {
      id: 'EVT003',
      title: 'John Smith Birthday',
      eventType: 'Birthday',
      department: 'Engineering',
      date: '2026-01-20',
      startTime: '00:00',
      endTime: '23:59',
      description: 'Birthday celebration for John Smith',
      organizer: 'HR Department',
      status: 'Approved'
    },
    {
      id: 'EVT004',
      title: 'Leadership Training',
      eventType: 'Training',
      department: 'All Departments',
      date: '2026-01-25',
      startTime: '10:00',
      endTime: '17:00',
      description: 'Leadership and management skills training program',
      organizer: 'Learning & Development',
      status: 'Approved'
    },
    {
      id: 'EVT005',
      title: 'Republic Day',
      eventType: 'Holiday',
      department: 'All Departments',
      date: '2026-01-26',
      startTime: '00:00',
      endTime: '23:59',
      description: 'National holiday - Republic Day',
      organizer: 'HR Department',
      status: 'Approved'
    },
    {
      id: 'EVT006',
      title: 'Sarah Johnson Leave',
      eventType: 'Leave',
      department: 'Marketing',
      date: '2026-02-05',
      startTime: '00:00',
      endTime: '23:59',
      description: 'Annual leave request approved',
      organizer: 'HR Department',
      status: 'Approved'
    },
    {
      id: 'EVT007',
      title: 'Team Building Workshop',
      eventType: 'Other',
      department: 'Engineering',
      date: '2026-02-10',
      startTime: '14:00',
      endTime: '18:00',
      description: 'Team building and collaboration workshop',
      organizer: 'Engineering Manager',
      status: 'Approved'
    },
    {
      id: 'EVT008',
      title: 'Budget Review Meeting',
      eventType: 'Meeting',
      department: 'Finance',
      date: '2026-02-15',
      startTime: '11:00',
      endTime: '13:00',
      description: 'Monthly budget review and planning',
      organizer: 'Finance Department',
      status: 'Approved'
    },
    {
      id: 'EVT009',
      title: 'Emily Davis Birthday',
      eventType: 'Birthday',
      department: 'Human Resources',
      date: '2026-02-18',
      startTime: '00:00',
      endTime: '23:59',
      description: 'Birthday celebration for Emily Davis',
      organizer: 'HR Department',
      status: 'Approved'
    },
    {
      id: 'EVT010',
      title: 'Holi Festival',
      eventType: 'Holiday',
      department: 'All Departments',
      date: '2026-03-14',
      startTime: '00:00',
      endTime: '23:59',
      description: 'Festival of Colors - Company holiday',
      organizer: 'HR Department',
      status: 'Approved'
    },
    {
      id: 'EVT011',
      title: 'Performance Review Cycle',
      eventType: 'Meeting',
      department: 'All Departments',
      date: '2026-03-20',
      startTime: '09:00',
      endTime: '17:00',
      description: 'Quarterly performance review meetings',
      organizer: 'HR Department',
      status: 'Approved'
    },
    {
      id: 'EVT012',
      title: 'David Wilson Leave',
      eventType: 'Leave',
      department: 'Engineering',
      date: '2026-03-25',
      startTime: '00:00',
      endTime: '23:59',
      description: 'Personal leave approved',
      organizer: 'HR Department',
      status: 'Approved'
    },
    {
      id: 'EVT013',
      title: 'Good Friday',
      eventType: 'Holiday',
      department: 'All Departments',
      date: '2026-04-18',
      startTime: '00:00',
      endTime: '23:59',
      description: 'Good Friday holiday',
      organizer: 'HR Department',
      status: 'Approved'
    },
    {
      id: 'EVT014',
      title: 'Safety Training',
      eventType: 'Training',
      department: 'Operations',
      date: '2026-04-22',
      startTime: '09:00',
      endTime: '13:00',
      description: 'Workplace safety and compliance training',
      organizer: 'Safety Officer',
      status: 'Approved'
    },
    {
      id: 'EVT015',
      title: 'Jessica Martinez Birthday',
      eventType: 'Birthday',
      department: 'Sales',
      date: '2026-04-28',
      startTime: '00:00',
      endTime: '23:59',
      description: 'Birthday celebration for Jessica Martinez',
      organizer: 'HR Department',
      status: 'Approved'
    },
    {
      id: 'EVT016',
      title: 'Labor Day',
      eventType: 'Holiday',
      department: 'All Departments',
      date: '2026-05-01',
      startTime: '00:00',
      endTime: '23:59',
      description: 'International Workers Day holiday',
      organizer: 'HR Department',
      status: 'Approved'
    },
    {
      id: 'EVT017',
      title: 'Sales Strategy Meeting',
      eventType: 'Meeting',
      department: 'Sales',
      date: '2026-05-10',
      startTime: '10:00',
      endTime: '15:00',
      description: 'Q2 sales strategy and target setting',
      organizer: 'Sales Director',
      status: 'Approved'
    },
    {
      id: 'EVT018',
      title: 'Robert Taylor Leave',
      eventType: 'Leave',
      department: 'Operations',
      date: '2026-05-15',
      startTime: '00:00',
      endTime: '23:59',
      description: 'Sick leave approved',
      organizer: 'HR Department',
      status: 'Approved'
    },
    {
      id: 'EVT019',
      title: 'Amanda Anderson Birthday',
      eventType: 'Birthday',
      department: 'Marketing',
      date: '2026-05-22',
      startTime: '00:00',
      endTime: '23:59',
      description: 'Birthday celebration for Amanda Anderson',
      organizer: 'HR Department',
      status: 'Approved'
    },
    {
      id: 'EVT020',
      title: 'Annual Company Picnic',
      eventType: 'Other',
      department: 'All Departments',
      date: '2026-06-15',
      startTime: '11:00',
      endTime: '18:00',
      description: 'Annual company picnic and team building event',
      organizer: 'HR Department',
      status: 'Approved'
    },
    {
      id: 'EVT021',
      title: 'Independence Day',
      eventType: 'Holiday',
      department: 'All Departments',
      date: '2026-08-15',
      startTime: '00:00',
      endTime: '23:59',
      description: 'Independence Day national holiday',
      organizer: 'HR Department',
      status: 'Approved'
    },
    {
      id: 'EVT022',
      title: 'Christopher Thomas Leave',
      eventType: 'Leave',
      department: 'Engineering',
      date: '2026-08-20',
      startTime: '00:00',
      endTime: '23:59',
      description: 'Family emergency leave',
      organizer: 'HR Department',
      status: 'Approved'
    },
    {
      id: 'EVT023',
      title: 'Gandhi Jayanti',
      eventType: 'Holiday',
      department: 'All Departments',
      date: '2026-10-02',
      startTime: '00:00',
      endTime: '23:59',
      description: 'Gandhi Jayanti holiday',
      organizer: 'HR Department',
      status: 'Approved'
    },
    {
      id: 'EVT024',
      title: 'Michelle Garcia Birthday',
      eventType: 'Birthday',
      department: 'Finance',
      date: '2026-10-15',
      startTime: '00:00',
      endTime: '23:59',
      description: 'Birthday celebration for Michelle Garcia',
      organizer: 'HR Department',
      status: 'Approved'
    },
    {
      id: 'EVT025',
      title: 'Diwali Celebration',
      eventType: 'Holiday',
      department: 'All Departments',
      date: '2026-10-20',
      startTime: '00:00',
      endTime: '23:59',
      description: 'Diwali festival holiday',
      organizer: 'HR Department',
      status: 'Approved'
    }
  ]);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'employees', label: 'Employees', icon: '👥' },
    { id: 'attendance', label: 'Attendance', icon: '📅' },
    { id: 'leave', label: 'Leave', icon: '🏖️' },
    { id: 'payroll', label: 'Payroll', icon: '💰' },
    { id: 'departments', label: 'Departments', icon: '🏢' },
    { id: 'calendar', label: 'Calendar', icon: '📆', active: true },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalEvents = events.length;
    const companyHolidays = events.filter(e => e.eventType === 'Holiday').length;
    const approvedLeaves = events.filter(e => e.eventType === 'Leave').length;
    const upcomingEvents = events.filter(e => new Date(e.date) >= new Date()).length;
    return { totalEvents, companyHolidays, approvedLeaves, upcomingEvents };
  }, [events]);

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesEventType = eventTypeFilter === 'all' || event.eventType === eventTypeFilter;
      
      let matchesMonth = true;
      let matchesYear = true;
      
      if (monthFilter !== 'all' || yearFilter !== 'all') {
        const eventDate = new Date(event.date);
        if (monthFilter !== 'all') {
          matchesMonth = eventDate.getMonth() === parseInt(monthFilter);
        }
        if (yearFilter !== 'all') {
          matchesYear = eventDate.getFullYear() === parseInt(yearFilter);
        }
      }
      
      return matchesSearch && matchesEventType && matchesMonth && matchesYear;
    });
  }, [events, searchTerm, eventTypeFilter, monthFilter, yearFilter]);

  // Get unique years for filter
  const availableYears = [...new Set(events.map(e => new Date(e.date).getFullYear()))].sort();

  const getMonthName = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const isToday = (day, month, year) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const getEventsForDate = (day, month, year) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filteredEvents.filter(event => event.date === dateStr);
  };

  const getEventTypeColor = (eventType) => {
    switch (eventType) {
      case 'Holiday': return 'event-holiday';
      case 'Leave': return 'event-leave';
      case 'Meeting': return 'event-meeting';
      case 'Birthday': return 'event-birthday';
      case 'Training': return 'event-training';
      default: return 'event-other';
    }
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    // Previous month days
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      days.push({
        day: prevMonthDays - i,
        month: prevMonth,
        year: prevYear,
        isCurrentMonth: false
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month: month,
        year: year,
        isCurrentMonth: true
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      days.push({
        day: i,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false
      });
    }

    return days;
  };

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const calendarDays = generateCalendarDays();

  const showNotification = (message, type) => {
    setNotification({ isOpen: true, message, type });
    setTimeout(() => setNotification({ isOpen: false, message: '', type: '' }), 3000);
  };

  const handleViewEvent = (event) => {
    setViewEventModal({ isOpen: true, event });
  };

  const handleAddEvent = () => {
    setAddEventModal({ isOpen: true, event: null });
  };

  const handleEditEvent = (event) => {
    setAddEventModal({ isOpen: true, event: { ...event } });
  };

  const handleDeleteEvent = (eventId) => {
    setDeleteEventModal({ isOpen: true, eventId });
  };

  const confirmDeleteEvent = () => {
    setEvents(prevEvents => prevEvents.filter(e => e.id !== deleteEventModal.eventId));
    setDeleteEventModal({ isOpen: false, eventId: null });
    showNotification('Event deleted successfully!', 'success');
  };

  const handleSaveEvent = () => {
    if (addEventModal.event) {
      if (addEventModal.event.id) {
        // Edit existing event
        setEvents(prevEvents => 
          prevEvents.map(e => e.id === addEventModal.event.id ? addEventModal.event : e)
        );
        showNotification('Event updated successfully!', 'success');
      } else {
        // Add new event
        const newEvent = {
          ...addEventModal.event,
          id: `EVT${String(events.length + 1).padStart(3, '0')}`
        };
        setEvents(prevEvents => [...prevEvents, newEvent]);
        showNotification('Event added successfully!', 'success');
      }
    }
    setAddEventModal({ isOpen: false, event: null });
  };

  const handleExportEvents = () => {
    const headers = ['ID', 'Title', 'Event Type', 'Department', 'Date', 'Start Time', 'End Time', 'Description', 'Organizer', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredEvents.map(event => [
        event.id,
        event.title,
        event.eventType,
        event.department,
        event.date,
        event.startTime,
        event.endTime,
        event.description,
        event.organizer,
        event.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `calendar_events_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    showNotification('Events exported successfully!', 'success');
  };

  if (isLoading) {
    return (
      <div className="calendar-layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-logo">Levora</h2>
            <p className="sidebar-tagline">HR Management</p>
          </div>
        </aside>
        <div className="main-content">
          <header className="navbar">
            <div className="navbar-left">
              <h1 className="page-title">Calendar</h1>
            </div>
          </header>
          <div className="content-wrapper">
            <div className="loading-skeleton">
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="calendar-layout">
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
            <h1 className="page-title">Calendar</h1>
            <p className="page-subtitle">Manage company events, holidays, employee leave and important HR activities.</p>
          </div>
          <div className="navbar-right">
            <button className="btn btn-secondary" onClick={goToPreviousMonth}>
              ← Previous
            </button>
            <button className="btn btn-primary" onClick={goToToday}>
              Today
            </button>
            <button className="btn btn-secondary" onClick={goToNextMonth}>
              Next →
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="content-wrapper">
          {/* Statistics Cards */}
          <div className="summary-cards">
            <div className="summary-card events">
              <div className="card-icon">📅</div>
              <div className="card-content">
                <div className="card-label">Total Events</div>
                <div className="card-value">{statistics.totalEvents}</div>
              </div>
            </div>
            <div className="summary-card holidays">
              <div className="card-icon">🎉</div>
              <div className="card-content">
                <div className="card-label">Company Holidays</div>
                <div className="card-value">{statistics.companyHolidays}</div>
              </div>
            </div>
            <div className="summary-card leaves">
              <div className="card-icon">🏖️</div>
              <div className="card-content">
                <div className="card-label">Approved Leaves</div>
                <div className="card-value">{statistics.approvedLeaves}</div>
              </div>
            </div>
            <div className="summary-card upcoming">
              <div className="card-icon">🔔</div>
              <div className="card-content">
                <div className="card-label">Upcoming Events</div>
                <div className="card-value">{statistics.upcomingEvents}</div>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="filters-section">
            <div className="filters-row">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search event or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="filter-select"
                value={eventTypeFilter}
                onChange={(e) => setEventTypeFilter(e.target.value)}
              >
                <option value="all">All Event Types</option>
                <option value="Holiday">Holiday</option>
                <option value="Leave">Leave</option>
                <option value="Meeting">Meeting</option>
                <option value="Birthday">Birthday</option>
                <option value="Training">Training</option>
                <option value="Other">Other</option>
              </select>
              <select
                className="filter-select"
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
              >
                <option value="all">All Months</option>
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
              </select>
              <select
                className="filter-select"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              >
                <option value="all">All Years</option>
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="filters-actions">
              <button className="btn btn-export" onClick={handleExportEvents}>
                Export CSV
              </button>
              <button className="btn btn-primary" onClick={handleAddEvent}>
                + Add Event
              </button>
            </div>
          </div>

          {/* Calendar Container */}
          <div className="calendar-container">
            {filteredEvents.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📅</div>
                <h3>No Events Found</h3>
                <p>Try adjusting your filters or add a new event to get started.</p>
              </div>
            ) : (
              <>
                {/* Weekday Headers */}
                <div className="calendar-weekdays">
                  {weekdays.map(day => (
                    <div key={day} className="weekday-header">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="calendar-grid">
                  {calendarDays.map((dateObj, index) => {
                    const dayEvents = getEventsForDate(dateObj.day, dateObj.month, dateObj.year);
                    return (
                      <div
                        key={index}
                        className={`calendar-day ${dateObj.isCurrentMonth ? 'current-month' : 'other-month'} ${isToday(dateObj.day, dateObj.month, dateObj.year) ? 'today' : ''}`}
                        onClick={() => {
                          if (dayEvents.length > 0) {
                            handleViewEvent(dayEvents[0]);
                          }
                        }}
                      >
                        <div className="day-number">{dateObj.day}</div>
                        <div className="day-events">
                          {dayEvents.slice(0, 3).map((event, idx) => (
                            <div
                              key={idx}
                              className={`event-badge ${getEventTypeColor(event.eventType)}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewEvent(event);
                              }}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="event-more">+{dayEvents.length - 3} more</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="calendar-legend">
                  <h4>Legend</h4>
                  <div className="legend-items">
                    <div className="legend-item">
                      <span className="legend-dot legend-holiday"></span>
                      <span>Holiday</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot legend-leave"></span>
                      <span>Leave</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot legend-meeting"></span>
                      <span>Meeting</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot legend-birthday"></span>
                      <span>Birthday</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot legend-training"></span>
                      <span>Training</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot legend-other"></span>
                      <span>Other</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* View Event Modal */}
      {viewEventModal.isOpen && (
        <div className="modal-overlay" onClick={() => setViewEventModal({ isOpen: false, event: null })}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Event Details</h3>
              <button className="modal-close" onClick={() => setViewEventModal({ isOpen: false, event: null })}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{viewEventModal.event?.date}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Event Name:</span>
                <span className="detail-value">{viewEventModal.event?.title}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Event Type:</span>
                <span className={`event-badge ${getEventTypeColor(viewEventModal.event?.eventType)}`}>
                  {viewEventModal.event?.eventType}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Department:</span>
                <span className="detail-value">{viewEventModal.event?.department}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Organizer:</span>
                <span className="detail-value">{viewEventModal.event?.organizer}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Time:</span>
                <span className="detail-value">{viewEventModal.event?.startTime} - {viewEventModal.event?.endTime}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Description:</span>
                <span className="detail-value">{viewEventModal.event?.description}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className="detail-value">{viewEventModal.event?.status}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setViewEventModal({ isOpen: false, event: null })}>
                Close
              </button>
              <button className="btn btn-primary" onClick={() => {
                setViewEventModal({ isOpen: false, event: null });
                handleEditEvent(viewEventModal.event);
              }}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => {
                setViewEventModal({ isOpen: false, event: null });
                handleDeleteEvent(viewEventModal.event?.id);
              }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Event Modal */}
      {addEventModal.isOpen && (
        <div className="modal-overlay" onClick={() => setAddEventModal({ isOpen: false, event: null })}>
          <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{addEventModal.event?.id ? 'Edit Event' : 'Add Event'}</h3>
              <button className="modal-close" onClick={() => setAddEventModal({ isOpen: false, event: null })}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Event Name</label>
                <input
                  type="text"
                  value={addEventModal.event?.title || ''}
                  onChange={(e) => setAddEventModal({
                    ...addEventModal,
                    event: { ...addEventModal.event, title: e.target.value }
                  })}
                />
              </div>
              <div className="form-group">
                <label>Event Type</label>
                <select
                  value={addEventModal.event?.eventType || ''}
                  onChange={(e) => setAddEventModal({
                    ...addEventModal,
                    event: { ...addEventModal.event, eventType: e.target.value }
                  })}
                >
                  <option value="">Select Event Type</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Leave">Leave</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Training">Training</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Department</label>
                <select
                  value={addEventModal.event?.department || ''}
                  onChange={(e) => setAddEventModal({
                    ...addEventModal,
                    event: { ...addEventModal.event, department: e.target.value }
                  })}
                >
                  <option value="">Select Department</option>
                  <option value="All Departments">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Sales">Sales</option>
                  <option value="Operations">Operations</option>
                  <option value="Management">Management</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={addEventModal.event?.date || ''}
                  onChange={(e) => setAddEventModal({
                    ...addEventModal,
                    event: { ...addEventModal.event, date: e.target.value }
                  })}
                />
              </div>
              <div className="form-group">
                <label>Start Time</label>
                <input
                  type="time"
                  value={addEventModal.event?.startTime || ''}
                  onChange={(e) => setAddEventModal({
                    ...addEventModal,
                    event: { ...addEventModal.event, startTime: e.target.value }
                  })}
                />
              </div>
              <div className="form-group">
                <label>End Time</label>
                <input
                  type="time"
                  value={addEventModal.event?.endTime || ''}
                  onChange={(e) => setAddEventModal({
                    ...addEventModal,
                    event: { ...addEventModal.event, endTime: e.target.value }
                  })}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={addEventModal.event?.description || ''}
                  onChange={(e) => setAddEventModal({
                    ...addEventModal,
                    event: { ...addEventModal.event, description: e.target.value }
                  })}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Organizer</label>
                <input
                  type="text"
                  value={addEventModal.event?.organizer || ''}
                  onChange={(e) => setAddEventModal({
                    ...addEventModal,
                    event: { ...addEventModal.event, organizer: e.target.value }
                  })}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={addEventModal.event?.status || ''}
                  onChange={(e) => setAddEventModal({
                    ...addEventModal,
                    event: { ...addEventModal.event, status: e.target.value }
                  })}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setAddEventModal({ isOpen: false, event: null })}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveEvent}>
                {addEventModal.event?.id ? 'Update Event' : 'Save Event'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Event Confirmation Modal */}
      {deleteEventModal.isOpen && (
        <div className="modal-overlay" onClick={() => setDeleteEventModal({ isOpen: false, eventId: null })}>
          <div className="modal modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Delete</h3>
              <button className="modal-close" onClick={() => setDeleteEventModal({ isOpen: false, eventId: null })}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this event?</p>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteEventModal({ isOpen: false, eventId: null })}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmDeleteEvent}>
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

export default Calendar;
