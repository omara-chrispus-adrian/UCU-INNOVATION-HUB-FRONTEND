import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content container-custom">
        {/* Main Footer Grid */}
        <div className="footer-grid">
          {/* About Section */}
          <div className="footer-section">
            <h3 className="footer-title">UCU Innovators Hub</h3>
            <p className="footer-text">
              Showcasing cutting-edge student projects in Robotics, Embedded Systems, Software Development, IoT, Mobile Apps & AI from Uganda Christian University.
            </p>
          </div>

          {/* Location Section */}
          <div className="footer-section">
            <h3 className="footer-title">📍 Location</h3>
            <div className="location-details">
              <p className="location-item">
                <strong>University Name:</strong> Uganda Christian University
              </p>
              <p className="location-item">
                <strong>Campus:</strong> Mukono Campus
              </p>
              <p className="location-item">
                <strong>Address:</strong> P.O. Box 4, Mukono, Uganda
              </p>
              <p className="location-item">
                <strong>City:</strong> Mukono
              </p>
              <p className="location-item">
                <strong>Country:</strong> Uganda
              </p>
              <p className="location-item">
                <strong>Region:</strong> Central Uganda
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Explore Projects</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
              <li><a href="#projects">Innovation Gallery</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h3 className="footer-title">Get In Touch</h3>
            <div className="contact-info">
              <p className="contact-item">
                <span className="label">Email:</span>
                <a href="mailto:innovationhub@ucu.ac.ug">innovationhub@ucu.ac.ug</a>
              </p>
              <p className="contact-item">
                <span className="label">Phone:</span>
                <a href="tel:+256256267273">+256 (256) 267 273</a>
              </p>
              <p className="contact-item">
                <span className="label">Website:</span>
                <a href="https://www.ucu.ac.ug" target="_blank" rel="noopener noreferrer">www.ucu.ac.ug</a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              &copy; {currentYear} Uganda Christian University. All rights reserved.
            </p>
            <div className="footer-legal-links">
              <a href="#privacy">Privacy Policy</a>
              <span className="divider">•</span>
              <a href="#terms">Terms of Service</a>
              <span className="divider">•</span>
              <a href="#contact">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
