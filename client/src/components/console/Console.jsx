import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './Console.scss';

// Mocked icons to avoid external dependencies
const Bell = () => <span className="icon">🔔</span>;
const DollarSign = () => <span className="icon">💲</span>;
const Logout = () => <span className="icon">🚪</span>; // Log out icon
const Update = () => <span className="icon">🛠️</span>; // Update Schedule icon
const DashboardIcon = () => <span className="icon">📊</span>; // Dashboard icon
const Speaker = () => <span className="icon">🎤</span>; // Speaker Info icon
const User = () => <span className="icon">👤</span>; // User Info icon
const Ticket = () => <span className="icon">🎫</span>; // Ticket icon
const Users = () => <span className="icon">👥</span>; // Users icon
const Mail = () => <span className="icon">✉️</span>; // Mail/Inquiries icon

const revenueData = [
  { name: "Jan", total: 1234 },
  { name: "Feb", total: 2234 },
  { name: "Mar", total: 3234 },
  { name: "Apr", total: 2734 },
  { name: "May", total: 3734 },
  { name: "Jun", total: 4234 },
];

const ticketData = [
  { name: "VIP", value: 400 },
  { name: "Regular", value: 300 },
  { name: "Economy", value: 300 },
];

const customerData = [
  { name: "New", value: 400 },
  { name: "Returning", value: 300 },
  { name: "Inactive", value: 100 },
];

const Stats = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Define the handleLogout function
  const handleLogout = () => {
    // Perform your logout logic here
    localStorage.removeItem('authToken'); // Remove authentication token
    navigate('/admin'); // Redirect to login page
  };

  

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <nav>
          <button className="nav-button"><DashboardIcon /> Dashboard</button>
          <button className="nav-button" onClick={() => navigate('/update')}><Update /> Update Schedule</button>
          <button className="nav-button"><User /> User Info</button>
          <button className="nav-button" onClick={() => navigate('/dashboard')}><Speaker /> Speaker Info</button>
          <button className="nav-button" onClick={handleLogout}><Logout /> Log Out</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-bar">
          <button className="menu-button" onClick={() => setSidebarOpen(!sidebarOpen)}>
  
          </button>
          <h1>Dashboard</h1>
          <button className="notification-button">
            <Bell />
          </button>
        </header>

        <div className="dashboard-content">
          {/* Stats Cards */}
          <div className="stats-cards">
            <div className="card">
              <div className="card-header">
                <h3>Total Revenue</h3>
                <DollarSign />
              </div>
              <div className="card-content">
                <p className="stat">$45,231.89</p>
                <p className="change positive">+20.1% from last month</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3>Tickets Sold</h3>
                <Ticket />
              </div>
              <div className="card-content">
                <p className="stat">2,350</p>
                <p className="change positive">+180.1% from last month</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3>New Customers</h3>
                <Users />
              </div>
              <div className="card-content">
                <p className="stat">+573</p>
                <p className="change positive">+20.1% from last week</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3>Inquiries</h3>
                <Mail />
              </div>
              <div className="card-content">
                <p className="stat">192</p>
                <p className="change negative">-5.2% from last week</p>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="charts">
            <div className="chart-card wide">
              <h3>Revenue Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#250065" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-card">
              <h3>Ticket Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={ticketData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#250065" label />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-card">
              <h3>Customer Segments</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={customerData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#250065" label />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-card wide">
              <h3>Monthly Inquiries</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="total" stroke="#250065" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Stats;
