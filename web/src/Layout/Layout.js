import React, { useState } from 'react';
import './Layout.css';
import { FaHome, FaUsers, FaEllipsisH, FaBars, FaSearch, FaBell, FaEnvelope, FaCalendar, FaComment, FaCalendarCheck, FaPlane, FaCalendarAlt, FaQuestionCircle, FaCheckCircle, FaMoneyBillAlt, FaTicketAlt, FaShoppingCart } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

function Layout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleProfileClick = () => {
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLeadsClick = () => {
    navigate('/leads');
  };

  const handleChatClick = () => {
    navigate('/chat');
  };

  const handleAttendanceClick = () => {
    navigate('/attendance');
  };

  const handleTravelClick = () => {
    navigate('/travel');
  };

  const handleScheduleClick = () => {
    navigate('/schedule');
  };

  const handleRequestClick = () => {
    navigate('/request');
  };

  const handleApprovalsClick = () => {
    navigate('/approvals');
  };

  const handlePayrollClick = () => {
    navigate('/payroll');
  };

  const handleTicketClick = () => {
    navigate('/ticket');
  };

  const handleOrderClick = () => {
    navigate('/order');
  };

  const handleOthersClick = () => {
    navigate('/others');
  };

  return (
    <div className={`layout-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar">
        <div className="sidebar-header">
          <button onClick={toggleSidebar} className="collapse-btn">
            <FaBars />
          </button>
          {!isSidebarCollapsed && <h1 className="logo">SaleSOS</h1>}
        </div>
        <div className="sidebar-menu">
            <button onClick={handleHomeClick} className={location.pathname === '/' ? 'active' : ''}><FaHome /> {!isSidebarCollapsed && 'Dashboard'}</button>
            <button onClick={handleLeadsClick} className={location.pathname === '/leads' ? 'active' : ''}><FaUsers /> {!isSidebarCollapsed && 'Leads'}</button>
            <button onClick={handleChatClick} className={location.pathname === '/chat' ? 'active' : ''}><FaComment /> {!isSidebarCollapsed && 'Chat'}</button>
            <button onClick={handleAttendanceClick} className={location.pathname === '/attendance' ? 'active' : ''}><FaCalendarCheck /> {!isSidebarCollapsed && 'Attendance'}</button>
            <button onClick={handleTravelClick} className={location.pathname === '/travel' ? 'active' : ''}><FaPlane /> {!isSidebarCollapsed && 'Travel'}</button>
            <button onClick={handleScheduleClick} className={location.pathname === '/schedule' ? 'active' : ''}><FaCalendarAlt /> {!isSidebarCollapsed && 'Schedule'}</button>
            <button onClick={handleRequestClick} className={location.pathname === '/request' ? 'active' : ''}><FaQuestionCircle /> {!isSidebarCollapsed && 'Request'}</button>
            <button onClick={handleApprovalsClick} className={location.pathname === '/approvals' ? 'active' : ''}><FaCheckCircle /> {!isSidebarCollapsed && 'Approvals'}</button>
            <button onClick={handlePayrollClick} className={location.pathname === '/payroll' ? 'active' : ''}><FaMoneyBillAlt /> {!isSidebarCollapsed && 'Payroll'}</button>
            <button onClick={handleTicketClick} className={location.pathname === '/ticket' ? 'active' : ''}><FaTicketAlt /> {!isSidebarCollapsed && 'Ticket'}</button>
            <button onClick={handleOrderClick} className={location.pathname === '/order' ? 'active' : ''}><FaShoppingCart /> {!isSidebarCollapsed && 'Order'}</button>
            <button onClick={handleOthersClick} className={location.pathname === '/others' ? 'active' : ''}><FaEllipsisH /> {!isSidebarCollapsed && 'Others'}</button>
        </div>
      </div>
      <div className="main-content">
        <header className="header">
          <div className="search-bar">
            <FaSearch />
            <input type="text" placeholder="Search here..." />
          </div>
          <div className="header-icons">
            <FaBell />
            <FaEnvelope />
            <FaCalendar />
            <div className="user-profile" onClick={handleProfileClick}>
              <img src="https://i.pravatar.cc/300" alt="User" />
              <div className="user-info">
                <span>Adam Joe</span>
              </div>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Layout;
