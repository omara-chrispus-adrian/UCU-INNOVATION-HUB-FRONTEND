import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import '../styles/Dashboard.css';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const { success, error, info } = useNotification();
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Smart Waste Management System',
      description: 'IoT-based waste management solution',
      status: 'approved',
      category: 'IoT',
      technologies: ['Arduino', 'Python', 'IoT'],
      approvalDate: '2025-10-15'
    },
    {
      id: 2,
      title: 'Student Mentorship Platform',
      description: 'Connect senior and junior students',
      status: 'pending',
      category: 'Web App',
      technologies: ['React', 'Node.js', 'MongoDB'],
      submissionDate: '2025-11-01'
    }
  ]);
  
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: 'web',
    technologies: '',
    githubLink: '',
    document: null
  });

  const handleSubmitProject = (e) => {
    e.preventDefault();
    
    if (editingProjectId) {
      // Update existing project
      setProjects(projects.map(p => 
        p.id === editingProjectId 
          ? {
              ...p,
              ...newProject,
              technologies: newProject.technologies.split(',').map(t => t.trim())
            }
          : p
      ));
      success(
        `Project "${newProject.title}" has been updated successfully.`,
        '✏️ Project Updated'
      );
      setTimeout(() => {
        info(
          `Student ${user?.full_name || user?.email} updated project "${newProject.title}".`,
          '✏️ Project Update - Supervisor Notification'
        );
      }, 500);
      setEditingProjectId(null);
    } else {
      // Create new project
      const project = {
        id: projects.length + 1,
        ...newProject,
        status: 'pending',
        submissionDate: new Date().toISOString().split('T')[0],
        technologies: newProject.technologies.split(',').map(t => t.trim())
      };
      setProjects([...projects, project]);
      
      // Notification for student
      success(
        `Your project "${newProject.title}" has been submitted successfully for review.`,
        '📤 Project Submitted'
      );
      
      // Simulate notification to supervisor
      setTimeout(() => {
        info(
          `New project submission: "${newProject.title}" by ${user?.full_name || user?.email}. Please review when available.`,
          '📥 New Project Submission - Supervisor Notification'
        );
      }, 500);
      
      // Simulate notification to admin
      setTimeout(() => {
        info(
          `Student ${user?.full_name || user?.email} submitted project "${newProject.title}" for review.`,
          '📥 New Submission - Admin Notification'
        );
      }, 1000);
    }
    
    setNewProject({
      title: '',
      description: '',
      category: 'web',
      technologies: '',
      githubLink: '',
      document: null
    });
    setShowSubmitForm(false);
  };

  const handleEditProject = (project) => {
    setNewProject({
      title: project.title,
      description: project.description,
      category: project.category,
      technologies: project.technologies.join(', '),
      githubLink: project.githubLink || '',
      document: null
    });
    setEditingProjectId(project.id);
    setShowSubmitForm(true);
  };

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId));
    const projectTitle = projects.find(p => p.id === projectId)?.title;
    success(
      `Project "${projectTitle}" has been deleted successfully.`,
      '🗑️ Project Deleted'
    );
    setTimeout(() => {
      info(
        `Student ${user?.full_name || user?.email} deleted project "${projectTitle}".`,
        '🗑️ Project Deletion - Admin Notification'
      );
    }, 500);
    setShowDeleteConfirm(null);
  };

  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setShowSubmitForm(false);
    setNewProject({
      title: '',
      description: '',
      category: 'web',
      technologies: '',
      githubLink: '',
      document: null
    });
  };

  const getStatusBadge = (status) => {
    const statusClass = `status-badge status-${status}`;
    return <span className={statusClass}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Student Dashboard</h1>
          <p>Welcome, {user?.name}</p>
        </div>
        <button onClick={logout} className="logout-btn">Logout</button>
      </header>

      <main className="dashboard-main">
        <section className="stats-section">
          <div className="stat-card">
            <h3>Total Projects</h3>
            <p className="stat-number">{projects.length}</p>
          </div>
          <div className="stat-card">
            <h3>Approved</h3>
            <p className="stat-number">{projects.filter(p => p.status === 'approved').length}</p>
          </div>
          <div className="stat-card">
            <h3>Pending Review</h3>
            <p className="stat-number">{projects.filter(p => p.status === 'pending').length}</p>
          </div>
        </section>

        <section className="projects-section">
          <div className="section-header">
            <h2>Your Projects</h2>
            <button 
              className="btn-primary"
              onClick={() => setShowSubmitForm(!showSubmitForm)}
            >
              {showSubmitForm ? 'Cancel' : '+ New Project'}
            </button>
          </div>

          {showSubmitForm && (
            <div className="form-card">
              <h3>{editingProjectId ? '✏️ Edit Project' : 'Submit New Project'}</h3>
              <form onSubmit={handleSubmitProject}>
                <div className="form-group">
                  <label>Project Title</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    placeholder="Enter project title"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    placeholder="Describe your project"
                    rows="4"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                    >
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile App</option>
                      <option value="iot">IoT</option>
                      <option value="ai">AI/Machine Learning</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Technologies (comma-separated)</label>
                    <input
                      type="text"
                      value={newProject.technologies}
                      onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
                      placeholder="e.g., React, Node.js, MongoDB"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>GitHub Link (optional)</label>
                  <input
                    type="url"
                    value={newProject.githubLink}
                    onChange={(e) => setNewProject({...newProject, githubLink: e.target.value})}
                    placeholder="https://github.com/yourrepo"
                  />
                </div>

                <div className="form-group">
                  <label>Project Document (PDF)</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setNewProject({...newProject, document: e.target.files[0]})}
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    {editingProjectId ? 'Update Project' : 'Submit Project'}
                  </button>
                  {editingProjectId && (
                    <button 
                      type="button" 
                      className="btn-secondary"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          <div className="projects-grid">
            {projects.length === 0 ? (
              <p className="no-data">No projects yet. Submit your first project!</p>
            ) : (
              projects.map(project => (
                <div key={project.id} className="project-card">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    {getStatusBadge(project.status)}
                  </div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-meta">
                    <span className="category">{project.category}</span>
                    <span className="date">
                      {project.status === 'approved' ? 'Approved: ' : 'Submitted: '}
                      {project.approvalDate || project.submissionDate}
                    </span>
                  </div>
                  <div className="tech-tags">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  
                  <div className="project-actions">
                    <button 
                      className="btn-secondary btn-sm"
                      onClick={() => handleEditProject(project)}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className="btn-danger btn-sm"
                      onClick={() => setShowDeleteConfirm(project.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>

                  {/* Delete Confirmation Modal */}
                  {showDeleteConfirm === project.id && (
                    <div className="delete-confirm">
                      <p>Are you sure you want to delete this project?</p>
                      <div className="confirm-buttons">
                        <button 
                          className="btn-danger"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          Yes, Delete
                        </button>
                        <button 
                          className="btn-secondary"
                          onClick={() => setShowDeleteConfirm(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
