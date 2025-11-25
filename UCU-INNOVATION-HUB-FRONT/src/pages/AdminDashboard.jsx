import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('analytics');
  
  const [analytics] = useState({
    totalProjects: 45,
    approvedProjects: 32,
    pendingProjects: 8,
    rejectedProjects: 5,
    totalUsers: 156,
    studentCount: 120,
    supervisorCount: 25,
    adminCount: 3,
    approvalRate: 71.1,
    projectsByFaculty: [
      { faculty: 'Engineering', count: 18 },
      { faculty: 'Business', count: 12 },
      { faculty: 'Law', count: 5 },
      { faculty: 'Humanities', count: 7 },
      { faculty: 'Sciences', count: 3 }
    ],
    trendingTechnologies: [
      { name: 'React', count: 15 },
      { name: 'Python', count: 12 },
      { name: 'Node.js', count: 11 },
      { name: 'MongoDB', count: 9 },
      { name: 'Firebase', count: 7 }
    ],
    projectsByMonth: [
      { month: 'September', count: 8 },
      { month: 'October', count: 12 },
      { month: 'November', count: 25 }
    ]
  });

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@ucu.ac.ug', role: 'student', faculty: 'Engineering', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@ucu.ac.ug', role: 'supervisor', faculty: 'Business', status: 'active' },
    { id: 3, name: 'Dr. Paul Mukama', email: 'pmukama@ucu.ac.ug', role: 'admin', faculty: 'Engineering', status: 'active' },
    { id: 4, name: 'Sarah Johnson', email: 'sarah@ucu.ac.ug', role: 'student', faculty: 'Sciences', status: 'active' },
    { id: 5, name: 'Mike Wilson', email: 'mike@ucu.ac.ug', role: 'supervisor', faculty: 'Law', status: 'inactive' }
  ]);

  const [categories] = useState([
    { id: 1, name: 'Web Development', count: 12 },
    { id: 2, name: 'Mobile App', count: 8 },
    { id: 3, name: 'IoT', count: 10 },
    { id: 4, name: 'AI/Machine Learning', count: 9 },
    { id: 5, name: 'Data Science', count: 6 }
  ]);

  const deactivateUser = (userId) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
        : u
    ));
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <p>Welcome, {user?.name}</p>
        </div>
        <button onClick={logout} className="logout-btn">Logout</button>
      </header>

      <nav className="admin-nav">
        <button 
          className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
        <button 
          className={`nav-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </button>
        <button 
          className={`nav-tab ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
      </nav>

      <main className="dashboard-main">
        {activeTab === 'analytics' && (
          <>
            <section className="stats-section">
              <div className="stat-card">
                <h3>Total Projects</h3>
                <p className="stat-number">{analytics.totalProjects}</p>
                <p className="stat-subtitle">Across all faculties</p>
              </div>
              <div className="stat-card">
                <h3>Approved</h3>
                <p className="stat-number">{analytics.approvedProjects}</p>
                <p className="stat-subtitle">{analytics.approvalRate}% approval rate</p>
              </div>
              <div className="stat-card">
                <h3>Pending Review</h3>
                <p className="stat-number">{analytics.pendingProjects}</p>
                <p className="stat-subtitle">Awaiting supervisor decision</p>
              </div>
              <div className="stat-card">
                <h3>Total Users</h3>
                <p className="stat-number">{analytics.totalUsers}</p>
                <p className="stat-subtitle">Active members</p>
              </div>
            </section>

            <section className="analytics-grid">
              <div className="analytics-card">
                <h3>Projects by Faculty</h3>
                <div className="chart-data">
                  {analytics.projectsByFaculty.map((item, idx) => (
                    <div key={idx} className="data-row">
                      <span className="label">{item.faculty}</span>
                      <div className="bar">
                        <div 
                          className="bar-fill" 
                          style={{ width: `${(item.count / 18) * 100}%` }}
                        ></div>
                      </div>
                      <span className="value">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="analytics-card">
                <h3>User Distribution</h3>
                <div className="user-distribution">
                  <div className="distribution-item">
                    <div className="percentage">
                      <span className="number">{((analytics.studentCount / analytics.totalUsers) * 100).toFixed(0)}%</span>
                    </div>
                    <p>Students ({analytics.studentCount})</p>
                  </div>
                  <div className="distribution-item">
                    <div className="percentage">
                      <span className="number">{((analytics.supervisorCount / analytics.totalUsers) * 100).toFixed(0)}%</span>
                    </div>
                    <p>Supervisors ({analytics.supervisorCount})</p>
                  </div>
                  <div className="distribution-item">
                    <div className="percentage">
                      <span className="number">{((analytics.adminCount / analytics.totalUsers) * 100).toFixed(0)}%</span>
                    </div>
                    <p>Admins ({analytics.adminCount})</p>
                  </div>
                </div>
              </div>

              <div className="analytics-card">
                <h3>Trending Technologies</h3>
                <div className="tech-list">
                  {analytics.trendingTechnologies.map((tech, idx) => (
                    <div key={idx} className="tech-item">
                      <span className="tech-name">{tech.name}</span>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${(tech.count / 15) * 100}%` }}
                        ></div>
                      </div>
                      <span className="tech-count">{tech.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="analytics-card">
                <h3>Submission Trend (Monthly)</h3>
                <div className="trend-chart">
                  {analytics.projectsByMonth.map((item, idx) => {
                    const maxCount = Math.max(...analytics.projectsByMonth.map(m => m.count));
                    return (
                      <div key={idx} className="trend-item">
                        <div className="trend-bar-container">
                          <div 
                            className="trend-bar" 
                            style={{ height: `${(item.count / maxCount) * 150}px` }}
                          ></div>
                        </div>
                        <span className="trend-label">{item.month}</span>
                        <span className="trend-value">{item.count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="analytics-card">
                <h3>Project Status Overview</h3>
                <div className="status-overview">
                  <div className="status-item approved">
                    <span className="status-label">Approved</span>
                    <span className="status-count">{analytics.approvedProjects}</span>
                    <span className="status-percentage">{((analytics.approvedProjects / analytics.totalProjects) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="status-item pending">
                    <span className="status-label">Pending</span>
                    <span className="status-count">{analytics.pendingProjects}</span>
                    <span className="status-percentage">{((analytics.pendingProjects / analytics.totalProjects) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="status-item rejected">
                    <span className="status-label">Rejected</span>
                    <span className="status-count">{analytics.rejectedProjects}</span>
                    <span className="status-percentage">{((analytics.rejectedProjects / analytics.totalProjects) * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'users' && (
          <section className="users-section">
            <h2>User Management</h2>
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Faculty</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td><span className="role-badge">{u.role}</span></td>
                      <td>{u.faculty}</td>
                      <td>
                        <span className={`status-badge status-${u.status}`}>
                          {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <button 
                          className={`btn-${u.status === 'active' ? 'deactivate' : 'activate'}`}
                          onClick={() => deactivateUser(u.id)}
                        >
                          {u.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'categories' && (
          <section className="categories-section">
            <h2>Project Categories</h2>
            <div className="categories-grid">
              {categories.map(cat => (
                <div key={cat.id} className="category-card">
                  <h4>{cat.name}</h4>
                  <p className="category-count">{cat.count} projects</p>
                  <button className="btn-secondary">Edit</button>
                </div>
              ))}
              <div className="category-card add-category">
                <h4>+ Add Category</h4>
                <button className="btn-primary">New Category</button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
