
import { useState } from 'react';
import './Dashboard.css';

// Dummy data for charts
const monthlyRevenue = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 15000 },
  { month: 'Mar', revenue: 18000 },
  { month: 'Apr', revenue: 14000 },
  { month: 'May', revenue: 20000 },
  { month: 'Jun', revenue: 17000 },
  { month: 'Jul', revenue: 22000 },
  { month: 'Aug', revenue: 21000 },
  { month: 'Sep', revenue: 19500 },
  { month: 'Oct', revenue: 23000 },
  { month: 'Nov', revenue: 25000 },
  { month: 'Dec', revenue: 27000 },
];
const yearlyRevenue = [
  { year: 2022, revenue: 180000 },
  { year: 2023, revenue: 220000 },
  { year: 2024, revenue: 260000 },
  { year: 2025, revenue: 310000 },
];

// Dummy data for companies
const companiesData = [
  { id: 1, name: 'Acme Corp', product: 'Enterprise CRM', employees: 450, joinDate: '2023-01-15' },
  { id: 2, name: 'TechVision Inc', product: 'Sales Pro', employees: 320, joinDate: '2023-06-22' },
  { id: 3, name: 'Global Solutions', product: 'Enterprise CRM', employees: 680, joinDate: '2024-03-10' },
  { id: 4, name: 'Innovate Labs', product: 'Sales Pro', employees: 195, joinDate: '2024-08-05' },
  { id: 5, name: 'NextGen Ventures', product: 'Enterprise CRM', employees: 520, joinDate: '2024-11-01' },
  { id: 6, name: 'CloudFirst Digital', product: 'Sales Pro', employees: 275, joinDate: '2025-01-20' },
];

function Dashboard() {
  const [chartType, setChartType] = useState('monthly');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // revenue totals and goals
  const monthlyGoal = 300000;
  const yearlyGoal = 1000000;
  const totalMonthly = monthlyRevenue.reduce((s, r) => s + r.revenue, 0);
  const totalYearly = yearlyRevenue.reduce((s, r) => s + r.revenue, 0);
  const totalForType = chartType === 'monthly' ? totalMonthly : totalYearly;
  const goalForType = chartType === 'monthly' ? monthlyGoal : yearlyGoal;
  const percentOfGoal = Math.min(100, Math.round((totalForType / goalForType) * 100));

  function CircleChart({ percent = 0, size = 120, stroke = 14 }) {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const dash = (percent / 100) * circumference;
    const dashOffset = circumference - dash;

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="donut-svg">
        <defs>
          <linearGradient id="donutGrad2" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          <circle r={radius} fill="none" stroke="#f3f4f6" strokeWidth={stroke} />
          <circle
            r={radius}
            fill="none"
            stroke="url(#donutGrad2)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90)`}
          />
        </g>
      </svg>
    );
  }

  

  return (
    <div className="dashboard-wrapper">
      {/* Overlay for mobile */}
      <div className={`dashboard-overlay ${sidebarOpen ? 'active' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-brand">SaleSOS</div>
        <nav className="sidebar-nav">
          <a href="#" className="active">Dashboard</a>
          <a href="#">Analytics</a>
          <a href="#">Customers</a>
          <a href="#">Settings</a>
        </nav>
        <div className="sidebar-footer">© 2025 SaleSOS</div>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button className="header-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>
            <h1 className="header-title">Dashboard</h1>
          </div>
          <div className="header-right">
            <button className="header-notifications">
              <svg width="24" height="24" fill="none" stroke="#6366f1" strokeWidth="2"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              <span className="notification-badge"></span>
            </button>
            <div className="header-profile">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" className="header-profile-image" />
              <div className="header-profile-info">
                <div className="profile-name">John Doe</div>
                <div className="profile-role">Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="dashboard-content">
          <div className="dashboard-container">
          {/* Revenue Section */}
          <div className="content-section">
            <div className="section-header">
              <h2 className="section-title">Company Revenue</h2>
              <div className="section-controls">
                <button className={`toggle-btn ${chartType === 'monthly' ? 'active' : ''}`} onClick={() => setChartType('monthly')}>Monthly</button>
                <button className={`toggle-btn ${chartType === 'yearly' ? 'active' : ''}`} onClick={() => setChartType('yearly')}>Yearly</button>
              </div>
            </div>

            <div className="chart-grid">
              <div className="revenue-chart">
                <div className="chart-bars">
                  {chartType === 'monthly' ? (
                    monthlyRevenue.map((item) => (
                      <div key={item.month} className="chart-bar">
                        <div className="bar-rect" style={{ height: `${(item.revenue / 30000) * 200}px` }}></div>
                        <div className="bar-label">{item.month}</div>
                        <div className="bar-value">${(item.revenue / 1000).toFixed(0)}k</div>
                      </div>
                    ))
                  ) : (
                    yearlyRevenue.map((item) => (
                      <div key={item.year} className="chart-bar">
                        <div className="bar-rect" style={{ height: `${(item.revenue / 350000) * 200}px` }}></div>
                        <div className="bar-label">{item.year}</div>
                        <div className="bar-value">${(item.revenue / 1000).toFixed(0)}k</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="revenue-summary">
                <div className="summary-header">
                  <div className="summary-title">Total Revenue</div>
                  <div className="summary-period">{chartType === 'monthly' ? 'Monthly' : 'Yearly'}</div>
                </div>
                <div className="summary-content">
                  <CircleChart percent={percentOfGoal} />
                  <div className="summary-stats">
                    <div className="summary-revenue">${totalForType.toLocaleString()}</div>
                    <div className="summary-progress">{percentOfGoal}% of ${goalForType.toLocaleString()}</div>
                  </div>
                </div>
                <div className="summary-note">Progress toward goal — keep tracking monthly trends</div>
              </div>
            </div>
          </div>

          {/* Companies & Employees Section */}
          <div className="content-section">
            <h2 className="section-title">Companies & Employees Overview</h2>
            <div className="companies-grid">
              <div className="companies-card">
                <div className="card-header">
                  <h3 className="card-title">Companies Using Our Product</h3>
                </div>
                <div className="companies-list">
                  {companiesData.map((company) => (
                    <div key={company.id} className="company-item">
                      <div className="company-info">
                        <div className="company-name">{company.name}</div>
                        <div className="company-product">{company.product}</div>
                      </div>
                      <div className="company-employees">
                        <div className="employee-count">{company.employees}</div>
                        <div className="employee-label">employees</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="employees-card">
                <div className="card-header">
                  <h3 className="card-title">Employee Overview</h3>
                </div>
                <div className="employees-stats">
                  <div className="stats-grid">
                    <div className="stat-card total-employees">
                      <div className="stat-label">Total Employees</div>
                      <div className="stat-value">{companiesData.reduce((sum, c) => sum + c.employees, 0).toLocaleString()}</div>
                    </div>
                    <div className="stat-card active-companies">
                      <div className="stat-label">Active Companies</div>
                      <div className="stat-value">{companiesData.length}</div>
                    </div>
                  </div>
                  <div className="avg-employees-card">
                    <div className="avg-label">Avg Employees per Company</div>
                    <div className="avg-value">{Math.round(companiesData.reduce((sum, c) => sum + c.employees, 0) / companiesData.length)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;