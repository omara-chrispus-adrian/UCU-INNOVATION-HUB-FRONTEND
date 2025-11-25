import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

const SupervisorDashboard = () => {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Smart Waste Management System',
      description: 'IoT-based waste management solution',
      status: 'pending',
      student: 'John Doe',
      category: 'IoT',
      technologies: ['Arduino', 'Python', 'IoT'],
      submissionDate: '2025-11-20',
      comments: []
    },
    {
      id: 2,
      title: 'AI-Powered Chatbot',
      description: 'Chatbot for university admissions',
      status: 'pending',
      student: 'Jane Smith',
      category: 'AI/ML',
      technologies: ['Python', 'TensorFlow', 'NLP'],
      submissionDate: '2025-11-18',
      comments: []
    },
    {
      id: 3,
      title: 'Campus Navigation App',
      description: 'Mobile app for campus navigation',
      status: 'approved',
      student: 'Mike Johnson',
      category: 'Mobile',
      technologies: ['React Native', 'Firebase'],
      submissionDate: '2025-11-10',
      approvalDate: '2025-11-15',
      comments: []
    }
  ]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [comment, setComment] = useState('');

  const handleApprove = (projectId) => {
    setProjects(projects.map(p => 
      p.id === projectId 
        ? { ...p, status: 'approved', approvalDate: new Date().toISOString().split('T')[0] }
        : p
    ));
    setSelectedProject(null);
  };

  const handleReject = (projectId) => {
    setProjects(projects.map(p => 
      p.id === projectId 
        ? { ...p, status: 'rejected' }
        : p
    ));
    setSelectedProject(null);
  };

  const handleAddComment = () => {
    if (!comment.trim() || !selectedProject) return;
    
    setProjects(projects.map(p => 
      p.id === selectedProject.id
        ? {
            ...p,
            comments: [...p.comments, {
              author: user?.name || 'Supervisor',
              text: comment,
              date: new Date().toISOString().split('T')[0]
            }]
          }
        : p
    ));
    setComment('');
    setSelectedProject({...selectedProject, comments: [...selectedProject.comments, {
      author: user?.name || 'Supervisor',
      text: comment,
      date: new Date().toISOString().split('T')[0]
    }]});
  };

  const pendingProjects = projects.filter(p => p.status === 'pending');
  const approvedProjects = projects.filter(p => p.status === 'approved');
  const rejectedProjects = projects.filter(p => p.status === 'rejected');

  const getStatusBadge = (status) => {
    const statusClass = `status-badge status-${status}`;
    return <span className={statusClass}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Supervisor Dashboard</h1>
          <p>Welcome, {user?.name}</p>
        </div>
        <button onClick={logout} className="logout-btn">Logout</button>
      </header>

      <main className="dashboard-main">
        <section className="stats-section">
          <div className="stat-card">
            <h3>Pending Review</h3>
            <p className="stat-number">{pendingProjects.length}</p>
          </div>
          <div className="stat-card">
            <h3>Approved</h3>
            <p className="stat-number">{approvedProjects.length}</p>
          </div>
          <div className="stat-card">
            <h3>Rejected</h3>
            <p className="stat-number">{rejectedProjects.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Reviewed</h3>
            <p className="stat-number">{projects.length}</p>
          </div>
        </section>

        <div className="supervisor-layout">
          <section className="projects-list-section">
            <h2>Pending Projects for Review</h2>
            
            {pendingProjects.length === 0 ? (
              <p className="no-data">No pending projects to review</p>
            ) : (
              <div className="projects-list">
                {pendingProjects.map(project => (
                  <div 
                    key={project.id} 
                    className={`project-list-item ${selectedProject?.id === project.id ? 'active' : ''}`}
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="item-header">
                      <h4>{project.title}</h4>
                      <span className="student-name">{project.student}</span>
                    </div>
                    <p className="item-description">{project.description.substring(0, 100)}...</p>
                    <span className="submission-date">{project.submissionDate}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {selectedProject && (
            <section className="project-detail-section">
              <div className="detail-header">
                <h2>{selectedProject.title}</h2>
                {getStatusBadge(selectedProject.status)}
              </div>

              <div className="detail-content">
                <div className="detail-group">
                  <h4>Student</h4>
                  <p>{selectedProject.student}</p>
                </div>

                <div className="detail-group">
                  <h4>Description</h4>
                  <p>{selectedProject.description}</p>
                </div>

                <div className="detail-group">
                  <h4>Category</h4>
                  <p>{selectedProject.category}</p>
                </div>

                <div className="detail-group">
                  <h4>Technologies</h4>
                  <div className="tech-tags">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="detail-group">
                  <h4>Submission Date</h4>
                  <p>{selectedProject.submissionDate}</p>
                </div>

                <div className="detail-group comments-section">
                  <h4>Comments</h4>
                  <div className="comments-list">
                    {selectedProject.comments.length === 0 ? (
                      <p className="no-data">No comments yet</p>
                    ) : (
                      selectedProject.comments.map((c, idx) => (
                        <div key={idx} className="comment">
                          <strong>{c.author}</strong>
                          <span className="comment-date">{c.date}</span>
                          <p>{c.text}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="comment-input">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment or feedback..."
                      rows="3"
                    />
                    <button 
                      className="btn-secondary"
                      onClick={handleAddComment}
                      disabled={!comment.trim()}
                    >
                      Add Comment
                    </button>
                  </div>
                </div>

                {selectedProject.status === 'pending' && (
                  <div className="action-buttons">
                    <button 
                      className="btn-approve"
                      onClick={() => handleApprove(selectedProject.id)}
                    >
                      ✓ Approve
                    </button>
                    <button 
                      className="btn-reject"
                      onClick={() => handleReject(selectedProject.id)}
                    >
                      ✗ Reject
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        {selectedProject === null && (
          <section className="recent-activity-section">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <span className="status approved">Approved</span>
                <span className="activity-text">Campus Navigation App by Mike Johnson</span>
              </div>
              {pendingProjects.slice(0, 2).map(p => (
                <div key={p.id} className="activity-item">
                  <span className="status pending">Pending</span>
                  <span className="activity-text">{p.title} by {p.student}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default SupervisorDashboard;
