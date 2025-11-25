import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Gallery.css';

const PublicGallery = () => {
  const { user, isAuthenticated } = useAuth();
  const [selectedProject, setSelectedProject] = useState(null);
  const [filters, setFilters] = useState({
    faculty: 'all',
    category: 'all',
    technology: 'all',
    searchTerm: ''
  });

  const [projects] = useState([
    {
      id: 1,
      title: 'Smart Waste Management System',
      description: 'An IoT-based waste management solution that optimizes waste collection routes.',
      faculty: 'engineering',
      category: 'IoT',
      technologies: ['Arduino', 'Python', 'IoT', 'Mobile App'],
      teamMembers: ['John Doe', 'Alice Smith'],
      approvalDate: '2025-10-15',
      githubLink: 'https://github.com/ucu/waste-management'
    },
    {
      id: 2,
      title: 'Campus Navigation Mobile App',
      description: 'A mobile application that helps students navigate the university campus.',
      faculty: 'engineering',
      category: 'Mobile App',
      technologies: ['React Native', 'Firebase', 'Google Maps'],
      teamMembers: ['Mike Johnson', 'Sarah Lee'],
      approvalDate: '2025-11-01',
      githubLink: 'https://github.com/ucu/campus-nav'
    },
    {
      id: 3,
      title: 'AI-Powered Student Chatbot',
      description: 'An intelligent chatbot for student admissions and university inquiries.',
      faculty: 'engineering',
      category: 'AI/Machine Learning',
      technologies: ['Python', 'TensorFlow', 'NLP', 'Flask'],
      teamMembers: ['Jane Smith', 'Robert Brown'],
      approvalDate: '2025-10-20',
      githubLink: 'https://github.com/ucu/chatbot'
    },
    {
      id: 4,
      title: 'Business Analytics Dashboard',
      description: 'A dashboard for analyzing business metrics and performance indicators.',
      faculty: 'business',
      category: 'Web App',
      technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
      teamMembers: ['Tom Wilson', 'Emily Davis'],
      approvalDate: '2025-11-05',
      githubLink: 'https://github.com/ucu/analytics'
    },
    {
      id: 5,
      title: 'Legal Document Management System',
      description: 'A system for managing and organizing legal documents in the law faculty.',
      faculty: 'law',
      category: 'Web App',
      technologies: ['Vue.js', 'Django', 'PostgreSQL'],
      teamMembers: ['Lisa Anderson', 'David Cooper'],
      approvalDate: '2025-10-28',
      githubLink: 'https://github.com/ucu/legal-docs'
    },
    {
      id: 6,
      title: 'Language Learning Platform',
      description: 'An interactive platform for learning African languages.',
      faculty: 'humanities',
      category: 'Web App',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      teamMembers: ['Grace Nakambe', 'Joseph Okonkwo'],
      approvalDate: '2025-11-02',
      githubLink: 'https://github.com/ucu/language-learn'
    },
    {
      id: 7,
      title: 'Environmental Data Analysis Tool',
      description: 'Tool for analyzing environmental data and climate trends.',
      faculty: 'sciences',
      category: 'Data Science',
      technologies: ['Python', 'Pandas', 'Matplotlib', 'Jupyter'],
      teamMembers: ['Dr. Sarah Kim', 'Mark Okoro'],
      approvalDate: '2025-10-25',
      githubLink: 'https://github.com/ucu/env-analysis'
    },
    {
      id: 8,
      title: 'Student Mentorship Platform',
      description: 'Connect senior and junior students for academic mentoring.',
      faculty: 'engineering',
      category: 'Web App',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Real-time Chat'],
      teamMembers: ['Chris Mbewe', 'Linda Okafor'],
      approvalDate: '2025-11-08',
      githubLink: 'https://github.com/ucu/mentorship'
    }
  ]);

  const filteredProjects = projects.filter(project => {
    if (filters.faculty !== 'all' && project.faculty !== filters.faculty) return false;
    if (filters.category !== 'all' && project.category !== filters.category) return false;
    if (filters.technology !== 'all' && !project.technologies.includes(filters.technology)) return false;
    if (filters.searchTerm && !project.title.toLowerCase().includes(filters.searchTerm.toLowerCase())) return false;
    return true;
  });

  const faculties = ['all', ...new Set(projects.map(p => p.faculty))];
  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const technologies = ['all', ...new Set(projects.flatMap(p => p.technologies))];

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <div className="header-content">
          <h1>UCU Innovators Hub</h1>
          <p>Discover innovative projects and research from our community</p>
        </div>
        <div className="header-actions">
          {!isAuthenticated && (
            <>
              <a href="/login" className="btn-secondary">Login</a>
              <a href="/register" className="btn-primary">Register</a>
            </>
          )}
          {isAuthenticated && (
            <p>Welcome, {user?.name}! <a href={`/dashboard/${user?.role}`}>Go to Dashboard</a></p>
          )}
        </div>
      </header>

      <main className="gallery-main">
        <aside className="filters-sidebar">
          <h3>Filters</h3>
          
          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search projects..."
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Faculty</label>
            <select 
              value={filters.faculty}
              onChange={(e) => handleFilterChange('faculty', e.target.value)}
            >
              <option value="all">All Faculties</option>
              <option value="engineering">Engineering, Design & Tech</option>
              <option value="business">Business & Economics</option>
              <option value="law">Law</option>
              <option value="humanities">Humanities & Social Sciences</option>
              <option value="sciences">Natural & Physical Sciences</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Category</label>
            <select 
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Technology</label>
            <select 
              value={filters.technology}
              onChange={(e) => handleFilterChange('technology', e.target.value)}
            >
              {technologies.slice(0, 10).map(tech => (
                <option key={tech} value={tech}>
                  {tech === 'all' ? 'All Technologies' : tech}
                </option>
              ))}
            </select>
          </div>

          <button 
            className="btn-secondary"
            onClick={() => setFilters({
              faculty: 'all',
              category: 'all',
              technology: 'all',
              searchTerm: ''
            })}
          >
            Reset Filters
          </button>
        </aside>

        <section className="projects-section">
          <h2>Featured Projects ({filteredProjects.length})</h2>
          
          {filteredProjects.length === 0 ? (
            <div className="no-results">
              <p>No projects found matching your filters. Try adjusting your search.</p>
            </div>
          ) : (
            <div className="projects-grid">
              {filteredProjects.map(project => (
                <div 
                  key={project.id} 
                  className="project-card"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="project-card-header">
                    <h3>{project.title}</h3>
                    <span className="category-badge">{project.category}</span>
                  </div>
                  <p className="project-card-description">{project.description}</p>
                  <div className="project-team">
                    <strong>Team:</strong> {project.teamMembers.join(', ')}
                  </div>
                  <div className="tech-tags">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-tag">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                  <button className="btn-view">View Details</button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProject(null)}>✕</button>
            
            <h2>{selectedProject.title}</h2>
            <p className="modal-category">{selectedProject.category}</p>
            
            <div className="modal-section">
              <h4>Description</h4>
              <p>{selectedProject.description}</p>
            </div>

            <div className="modal-section">
              <h4>Team Members</h4>
              <ul>
                {selectedProject.teamMembers.map((member, idx) => (
                  <li key={idx}>{member}</li>
                ))}
              </ul>
            </div>

            <div className="modal-section">
              <h4>Technologies Used</h4>
              <div className="tech-tags">
                {selectedProject.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            <div className="modal-section">
              <h4>Approval Date</h4>
              <p>{selectedProject.approvalDate}</p>
            </div>

            {selectedProject.githubLink && (
              <div className="modal-actions">
                <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  View on GitHub
                </a>
              </div>
            )}

            {isAuthenticated && (
              <div className="modal-feedback">
                <h4>Leave Feedback</h4>
                <textarea placeholder="Share your thoughts on this project..." rows="4"></textarea>
                <button className="btn-secondary">Submit Feedback</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicGallery;
