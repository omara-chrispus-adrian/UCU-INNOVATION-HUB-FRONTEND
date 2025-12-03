import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import '../styles/Dashboard.css';

const SupervisorDashboard = () => {
  const { user, logout } = useAuth();
  const { success, error, info } = useNotification();
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
  const [actionModal, setActionModal] = useState(null);
  const [actionComment, setActionComment] = useState('');

  const handleApprove = () => {
    if (!actionComment.trim()) {
      error('Please add a comment before approving');
      return;
    }

    setProjects(projects.map(p => 
      p.id === selectedProject.id 
        ? { 
            ...p, 
            status: 'approved', 
            approvalDate: new Date().toISOString().split('T')[0],
            comments: [...p.comments, {
              author: user?.name || 'Supervisor',
              text: `[APPROVAL] ${actionComment}`,
              date: new Date().toISOString().split('T')[0],
              type: 'approval'
            }]
          }
        : p
    ));
    
    // Notification for supervisor
    success(
      `Project "${selectedProject.title}" has been approved successfully.`,
      '✓ Project Approved'
    );
    
    // Simulate notifications to student and admin
    // In a real app, these would be sent via API
    setTimeout(() => {
      info(
        `${user?.name || 'Your supervisor'} approved your project "${selectedProject.title}"`,
        '✓ Project Approved - Student Notification'
      );
    }, 500);
    
    setTimeout(() => {
      info(
        `Supervisor ${user?.name} approved project "${selectedProject.title}" by ${selectedProject.student}`,
        '✓ Project Approval - Admin Notification'
      );
    }, 1000);
    
    setActionModal(null);
    setActionComment('');
    setSelectedProject(null);
  };

  const handleReject = () => {
    if (!actionComment.trim()) {
      error('Please add a comment before rejecting');
      return;
    }

    setProjects(projects.map(p => 
      p.id === selectedProject.id 
        ? { 
            ...p, 
            status: 'rejected',
            comments: [...p.comments, {
              author: user?.name || 'Supervisor',
              text: `[REJECTION] ${actionComment}`,
              date: new Date().toISOString().split('T')[0],
              type: 'rejection'
            }]
          }
        : p
    ));
    
    // Notification for supervisor
    success(
      `Project "${selectedProject.title}" has been rejected.`,
      '✗ Project Rejected'
    );
    
    // Simulate notifications to student and admin
    setTimeout(() => {
      info(
        `${user?.name || 'Your supervisor'} rejected your project "${selectedProject.title}". Please review the feedback and resubmit.`,
        '✗ Project Rejected - Student Notification'
      );
    }, 500);
    
    setTimeout(() => {
      info(
        `Supervisor ${user?.name} rejected project "${selectedProject.title}" by ${selectedProject.student}`,
        '✗ Project Rejection - Admin Notification'
      );
    }, 1000);
    
    setActionModal(null);
    setActionComment('');
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
                      onClick={() => setActionModal('approve')}
                    >
                      ✓ Approve
                    </button>
                    <button 
                      className="btn-reject"
                      onClick={() => setActionModal('reject')}
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

      {/* Action Modal */}
      {actionModal && (
        <div className="modal-overlay" onClick={() => { setActionModal(null); setActionComment(''); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {actionModal === 'approve' ? '✓ Approve Project' : '✗ Reject Project'}
              </h3>
              <button 
                className="modal-close"
                onClick={() => { setActionModal(null); setActionComment(''); }}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-info">
                {actionModal === 'approve' 
                  ? 'Please provide feedback before approving this project.'
                  : 'Please provide feedback and reasons before rejecting this project.'
                }
              </p>
              
              <div className="form-group">
                <label>Supervisor Comment</label>
                <textarea
                  value={actionComment}
                  onChange={(e) => setActionComment(e.target.value)}
                  placeholder={actionModal === 'approve' 
                    ? 'e.g., Great work! This project demonstrates excellent innovation...'
                    : 'e.g., Please revise the following aspects: ...'
                  }
                  rows="5"
                  className="action-textarea"
                />
                <p className="char-count">{actionComment.length}/500 characters</p>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => { setActionModal(null); setActionComment(''); }}
              >
                Cancel
              </button>
              <button 
                className={actionModal === 'approve' ? 'btn-approve' : 'btn-reject'}
                onClick={actionModal === 'approve' ? handleApprove : handleReject}
                disabled={!actionComment.trim()}
              >
                {actionModal === 'approve' ? 'Approve' : 'Reject'} Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupervisorDashboard;
