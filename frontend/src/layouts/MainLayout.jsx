import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { useState, useEffect } from "react";
import "../styles/mainlayout.css";

function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Reset states based on breakpoint
      if (width >= 768 && width < 1200) {
        // Tablet: start collapsed (icons only)
        setSidebarExpanded(false);
        setSidebarCollapsed(false);
      } else if (width >= 1200) {
        // Desktop: always expanded
        setSidebarExpanded(false);
        setSidebarCollapsed(false);
      }
      // Mobile: no sidebar state changes needed
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    const width = window.innerWidth;
    
    if (width < 768) {
      // Mobile: toggle mobile offcanvas sidebar
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else if (width >= 768 && width < 1200) {
      // Tablet: toggle expanded/collapsed state
      setSidebarExpanded(!sidebarExpanded);
    } else {
      // Desktop: toggle collapsed state
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="main-layout">
      <Navbar onMenuClick={toggleSidebar} />
      <div className="main-content-wrapper">
        <Sidebar 
          collapsed={sidebarCollapsed}
          expanded={sidebarExpanded}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={closeMobileSidebar}
        />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      {mobileSidebarOpen && (
        <div className="sidebar-overlay active" onClick={closeMobileSidebar}></div>
      )}
    </div>
  );
}

export default MainLayout;
