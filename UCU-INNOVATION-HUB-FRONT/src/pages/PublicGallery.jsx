import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import SearchFilters from '../components/SearchFilters';
import HeroSlideshow from '../components/HeroSlideshow';
import { projectsAPI } from '../utils/api';
import '../styles/PublicGallery.css';
import '../styles/HeroSlideshow.css';

const PublicGallery = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for development (remove when backend is ready)
  const mockProjects = [
    {
      id: 1,
      title: 'Autonomous Robotic Arm for Manufacturing',
      description: 'A 6-axis robotic arm designed for precision assembly in manufacturing environments. Features computer vision for object recognition, Arduino Mega control, and servo motor coordination. Successfully tested in automated PCB assembly with 98% accuracy.',
      faculty: 'Engineering, Design and Technology',
      category: 'Robotics',
      technologies: 'Arduino Mega, Python, OpenCV, Servo Motors, Computer Vision',
      year: 2025,
      status: 'approved',
      github_link: 'https://github.com/ucu/robotic-arm',
      image: '/images/robotics_project.png'
    },
    {
      id: 2,
      title: 'Smart Home IoT Ecosystem',
      description: 'Complete home automation system using ESP32 microcontrollers with temperature, humidity, and motion sensors. Mobile app provides real-time monitoring and control. Features include automated lighting, climate control, and security alerts with cloud integration.',
      faculty: 'Engineering, Design and Technology',
      category: 'IoT & Embedded Systems',
      technologies: 'ESP32, MQTT, React Native, Firebase, Cloud IoT',
      year: 2025,
      status: 'approved',
      github_link: 'https://github.com/ucu/smart-home',
      image: '/images/iot_project.png'
    },
    {
      id: 3,
      title: 'AI-Powered Crop Disease Detection System',
      description: 'Machine learning application that identifies crop diseases from leaf images using convolutional neural networks. Trained on 50,000+ images with 94% accuracy. Mobile app allows farmers to get instant diagnoses and treatment recommendations in local languages.',
      faculty: 'Science and Technology',
      category: 'AI/Machine Learning',
      technologies: 'Python, TensorFlow, Keras, Flutter, CNN, Image Processing',
      year: 2025,
      status: 'approved',
      github_link: 'https://github.com/ucu/crop-disease-ai',
      image: '/images/ai_machine_learning.png'
    },
    {
      id: 4,
      title: 'Enterprise Resource Planning Dashboard',
      description: 'Comprehensive ERP system for small and medium enterprises featuring inventory management, financial tracking, and employee management. Real-time analytics dashboard with predictive insights using machine learning for demand forecasting.',
      faculty: 'Business and Administration',
      category: 'Software Development',
      technologies: 'React, Node.js, PostgreSQL, Chart.js, Machine Learning',
      year: 2025,
      status: 'approved',
      github_link: 'https://github.com/ucu/erp-system',
      image: '/images/software_development.png'
    },
    {
      id: 5,
      title: 'Mobile Banking App for Rural Communities',
      description: 'Cross-platform mobile banking solution designed for underserved rural communities. Features offline transaction mode, SMS backup, biometric authentication, and support for local languages. Integrates with mobile money platforms and includes financial literacy modules.',
      faculty: 'Business and Administration',
      category: 'Mobile Development',
      technologies: 'React Native, Node.js, MongoDB, Blockchain, Biometrics',
      year: 2025,
      status: 'approved',
      github_link: 'https://github.com/ucu/rural-banking',
      image: '/images/mobile_app_dev.png'
    },
    {
      id: 6,
      title: 'Wearable Health Monitoring Device',
      description: 'IoT wearable that continuously tracks vital signs including heart rate, blood oxygen (SpO2), temperature, and activity levels. Data syncs to cloud for analysis and sends emergency alerts to designated contacts. Includes predictive health analytics.',
      faculty: 'Science and Technology',
      category: 'IoT & Embedded Systems',
      technologies: 'Arduino, Sensors, Cloud IoT, Mobile App, Data Analytics',
      year: 2024,
      status: 'approved',
      github_link: 'https://github.com/ucu/health-wearable',
      image: '/images/embedded_systems.png'
    },
    {
      id: 7,
      title: 'Legal Case Management System',
      description: 'Digital platform for law firms to manage cases, documents, and client communications. Features automated document generation, deadline tracking, case law research integration, and secure client portal. Compliant with data protection regulations.',
      faculty: 'Law',
      category: 'Software Development',
      technologies: 'Vue.js, Django, PostgreSQL, Document Processing, Encryption',
      year: 2024,
      status: 'approved',
      github_link: 'https://github.com/ucu/legal-case-mgmt',
      image: '/images/slide_1.png'
    },
    {
      id: 8,
      title: 'Voice-Controlled Assistive Wheelchair',
      description: 'Innovative assistive technology featuring voice-controlled wheelchair navigation with obstacle avoidance. Uses speech recognition in multiple languages, ultrasonic sensors for safety, and GPS for outdoor navigation. Designed for individuals with limited mobility.',
      faculty: 'Engineering, Design and Technology',
      category: 'Robotics',
      technologies: 'Raspberry Pi, Speech Recognition, Ultrasonic Sensors, GPS, Motor Control',
      year: 2025,
      status: 'approved',
      github_link: 'https://github.com/ucu/voice-wheelchair',
      image: '/images/slide_2.png'
    },
    {
      id: 9,
      title: 'Interactive African Languages Learning Platform',
      description: 'Gamified e-learning platform for African languages with speech recognition for pronunciation practice. Features interactive lessons, cultural context, progress tracking, and community forums. Supports Luganda, Swahili, and other regional languages.',
      faculty: 'Social Sciences',
      category: 'Educational Technology',
      technologies: 'React, Node.js, Speech Recognition, Gamification, MongoDB',
      year: 2025,
      status: 'approved',
      github_link: 'https://github.com/ucu/language-platform',
      image: '/images/slide_3.png'
    },
    {
      id: 10,
      title: 'Climate Data Analysis and Prediction Tool',
      description: 'Advanced data science tool for analyzing climate patterns and predicting weather trends in East Africa. Uses historical data and machine learning models to forecast rainfall, temperature changes, and extreme weather events. Provides actionable insights for agriculture.',
      faculty: 'Science and Technology',
      category: 'Data Science & AI',
      technologies: 'Python, Pandas, TensorFlow, Jupyter, Data Visualization, APIs',
      year: 2024,
      status: 'approved',
      github_link: 'https://github.com/ucu/climate-analysis',
      image: '/images/slide_4.png'
    }
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      // Try to fetch from API, fallback to mock data
      try {
        const response = await projectsAPI.getAll({ status: 'approved' });
        const projectsData = response.data.projects || response.data || [];
        setProjects(projectsData);
        setFilteredProjects(projectsData);
      } catch (apiError) {
        // Use mock data if API is not available
        console.log('Using mock data:', apiError.message);
        setProjects(mockProjects);
        setFilteredProjects(mockProjects);
      }
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters) => {
    let filtered = [...projects];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.technologies.toLowerCase().includes(searchLower)
      );
    }

    // Faculty filter
    if (filters.faculty) {
      filtered = filtered.filter(project => project.faculty === filters.faculty);
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(project => project.category === filters.category);
    }

    // Year filter
    if (filters.year) {
      filtered = filtered.filter(project => project.year === parseInt(filters.year));
    }

    setFilteredProjects(filtered);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-content">
          <div className="spinner"></div>
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <p className="error-message">{error}</p>
          <button onClick={fetchProjects} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="public-gallery">
      {/* Hero Section */}
      <section className="hero-section">
        <HeroSlideshow />
        <div className="hero-overlay"></div>
        <div className="container-custom">
          <div className="hero-content">
            <h1 className="hero-title">
              UCU Innovators Hub
            </h1>
            <p className="hero-subtitle">
              Showcasing cutting-edge projects in Robotics, Embedded Systems, Software Development, IoT, Mobile Apps & AI
            </p>
            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary btn-lg">
                Explore Projects
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="projects" className="gallery-content container-custom">
        <SearchFilters onFilterChange={handleFilterChange} />

        {/* Projects Grid */}
        <div className="projects-header">
          <h2 className="projects-heading">
            🚀 Innovation Showcase
          </h2>
          <p className="projects-subtitle">
            Explore cutting-edge student projects in Robotics, IoT, AI, and Embedded Systems
          </p>
          <p className="projects-count">
            Showing {filteredProjects.length} of {projects.length} innovative projects
          </p>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="no-results card">
            <div className="no-results-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="no-results-title">No Projects Found</h3>
            <p className="no-results-text">Try adjusting your filters to see more results</p>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="container-custom">
          <div className="footer-content">
            {/* Location Details */}
            <div className="footer-column">
              <h3 className="footer-heading">📍 Location</h3>
              <div className="location-info">
                <p><strong>University:</strong> Uganda Christian University</p>
                <p><strong>Campus:</strong> Mukono Campus</p>
                <p><strong>Address:</strong> P.O. Box 4, Mukono</p>
                <p><strong>City:</strong> Mukono</p>
                <p><strong>Country:</strong> Uganda</p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="footer-column">
              <h3 className="footer-heading">📧 Contact</h3>
              <div className="contact-links">
                <p><a href="mailto:innovationhub@ucu.ac.ug">innovationhub@ucu.ac.ug</a></p>
                <p><a href="tel:+256256267273">+256 (256) 267 273</a></p>
                <p><a href="https://www.ucu.ac.ug" target="_blank" rel="noopener noreferrer">www.ucu.ac.ug</a></p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h3 className="footer-heading">🔗 Quick Links</h3>
              <ul className="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
              </ul>
            </div>

            {/* About */}
            <div className="footer-column">
              <h3 className="footer-heading">ℹ️ About</h3>
              <p className="footer-description">
                UCU Innovators Hub showcases cutting-edge student projects in Robotics, IoT, AI, and Embedded Systems from Uganda Christian University.
              </p>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Uganda Christian University. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicGallery;
