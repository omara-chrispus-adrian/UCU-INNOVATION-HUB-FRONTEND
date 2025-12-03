CREATE DATABASE UCU_INNOVATORS_HUB_DB;
USE UCU_INNOVATORS_HUB_DB;

CREATE TABLE ROLES(
    ROLE_ID VARCHAR(25) PRIMARY KEY,
    ROLE_NAME VARCHAR(100)
);

CREATE TABLE faculties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  faculty_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  FOREIGN KEY (faculty_id) REFERENCES faculties(id)
);

INSERT INTO faculties (name) 
VALUES
('Faculty of Engineering, Design and Technology'),
('Faculty of Business and Administration'),
('Faculty of Science and Technology'),
('Faculty of Education & Arts');

INSERT INTO departments (faculty_id, name) 
VALUES
(1, 'Department of Computing and Technology'),
(1, 'Department of Engineering'),
(2, 'Business IT'),
(3, 'Computer Science Department'),
(4, 'ICT in Education');

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('student','supervisor','admin') NOT NULL DEFAULT 'student',
  faculty_id INT,
  department_id INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (faculty_id) REFERENCES faculties(id),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

INSERT INTO users (name, email, password_hash, role, faculty_id, department_id)
VALUES
('Juliet', 'juliet@ucu.ac.ug', 'hashed123', 'student', 1, 1),
('Eng. Mark', 'mark@ucu.ac.ug', 'hashed123', 'supervisor', 1, 1),
('Admin Grace', 'admin@ucu.ac.ug', 'hashed123', 'admin', 1, 1);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

INSERT INTO categories (name) 
VALUES
('Web Development'),
('Mobile Applications'),
('Machine Learning'),
('Artificial Intelligence'),
('Networking & Security'),
('IoT and Embedded Systems'),
('Database Systems');

CREATE TABLE technologies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO technologies (name) 
VALUES
('React'),('Node.js'),('Django'),('Flutter'),('Python'),('MySQL'),
('PostgreSQL'),('Laravel'),('MongoDB'),('TensorFlow'),('JavaScript'),
('PHP'),('C++'),('Java');

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category_id INT,
  year INT,
  github_link VARCHAR(255),
  status ENUM('draft','submitted','under_review','approved','rejected') DEFAULT 'draft',
  created_by INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE project_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  user_id INT NOT NULL,
  role_in_team VARCHAR(100),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE project_files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_name VARCHAR(255),
  uploaded_by INT,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

CREATE TABLE project_tech (
  project_id INT NOT NULL,
  technology_id INT NOT NULL,
  PRIMARY KEY (project_id, technology_id),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (technology_id) REFERENCES technologies(id)
);

CREATE TABLE approvals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  reviewer_id INT NOT NULL,
  action ENUM('approve','reject','comment') NOT NULL,
  comment TEXT,
  action_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (reviewer_id) REFERENCES users(id)
);

CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO projects (title, description, category_id, year, github_link, status, created_by)
VALUES
('UCU Smart Attendance System',
 'A QR-code based attendance tracking system for lecturers and students.',
 1, 2025, 'https://github.com/juliet/smart-attendance', 'approved', 1),

('AI Crop Disease Detector',
 'A machine learning model that identifies crop diseases from leaf images.',
 3, 2025, 'https://github.com/juliet/crop-ai', 'under_review', 1),

('UCU Hostel Finder',
 'A mobile app that helps students find affordable and nearby hostels.',
 2, 2024, 'https://github.com/juliet/hostel-finder', 'submitted', 1);

INSERT INTO project_members (project_id, user_id, role_in_team)
VALUES
(1, 1,'Team Leader');

INSERT INTO project_members (project_id, user_id, role_in_team)
VALUES
(2, 1,'ML Engineer');
INSERT INTO project_members (project_id, user_id, role_in_team)
VALUES
(3, 1,'Backend Developer');

INSERT INTO project_files (project_id, file_path, file_name, uploaded_by)
VALUES
(1, 'uploads/projects/1/smart_attendance.pdf', 'smart_attendance.pdf', 1),
(2, 'uploads/projects/2/crop_ai_report.pdf', 'crop_ai_report.pdf', 1),
(3, 'uploads/projects/3/hostel_finder_documentation.pdf', 'hostel_finder_documentation.pdf', 1);

INSERT INTO project_tech (project_id, technology_id) VALUES
(1, 1),  
(1, 2), 
(1, 6);
INSERT INTO project_tech (project_id, technology_id) VALUES
(2, 5),
(2, 10),
(2, 7);  
INSERT INTO project_tech (project_id, technology_id) VALUES
(3, 4), 
(3, 9);

INSERT INTO approvals (project_id, reviewer_id, action, comment)
VALUES
(1, 2, 'approve', 'Great work! Approved for public display.'),

(2, 2, 'comment', 'Improve the accuracy report and include dataset details.'),

(3, 2, 'comment', 'Add screenshots of the final mobile UI before approval.');

INSERT INTO comments (project_id, user_id, content)
VALUES
(1, 1, 'Thank you for the feedback, I have updated the documentation.'),

(2, 2, 'Model accuracy is promising. Try increasing training epochs.'),

(3, 1, 'UI screenshots have been added. Waiting for further review.');

