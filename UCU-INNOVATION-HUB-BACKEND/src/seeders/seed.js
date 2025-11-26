const { sequelize } = require('../config/database');
const { User, Project } = require('../models');
require('dotenv').config();

const seedData = async () => {
    try {
        console.log('🌱 Starting database seeding...\n');

        // Sync database (force: true will drop existing tables)
        await sequelize.sync({ force: true });
        console.log('✓ Database tables created\n');

        // Create demo users
        console.log('Creating demo users...');

        const student = await User.create({
            email: 'student@ucu.ac.ug',
            password: 'password123',
            full_name: 'John Doe',
            role: 'student',
            faculty: 'Faculty of Science and Technology',
            year: 3
        });

        const supervisor = await User.create({
            email: 'supervisor@ucu.ac.ug',
            password: 'password123',
            full_name: 'Dr. Jane Smith',
            role: 'supervisor',
            faculty: 'Faculty of Science and Technology'
        });

        const admin = await User.create({
            email: 'admin@ucu.ac.ug',
            password: 'password123',
            full_name: 'Admin User',
            role: 'admin'
        });

        const student2 = await User.create({
            email: 'mary@ucu.ac.ug',
            password: 'password123',
            full_name: 'Mary Nakato',
            role: 'student',
            faculty: 'Faculty of Business and Administration',
            year: 4
        });

        console.log('✓ Demo users created\n');

        // Create sample projects
        console.log('Creating sample projects...');

        await Project.create({
            title: 'Autonomous Robotic Arm for Manufacturing',
            description: 'A 6-axis robotic arm designed for precision assembly in manufacturing environments. Features computer vision for object recognition, Arduino Mega control, and servo motor coordination. Successfully tested in automated PCB assembly with 98% accuracy.',
            technologies: 'Arduino Mega, Python, OpenCV, Servo Motors, Computer Vision',
            github_link: 'https://github.com/ucu/robotic-arm',
            status: 'approved',
            student_id: student.id,
            supervisor_id: supervisor.id,
            faculty: 'Engineering, Design and Technology',
            year: 2025,
            image: '/images/robotics_project.png'
        });

        await Project.create({
            title: 'Smart Home IoT Ecosystem',
            description: 'Complete home automation system using ESP32 microcontrollers with temperature, humidity, and motion sensors. Mobile app provides real-time monitoring and control. Features include automated lighting, climate control, and security alerts with cloud integration.',
            technologies: 'ESP32, MQTT, React Native, Firebase, Cloud IoT',
            github_link: 'https://github.com/ucu/smart-home',
            status: 'approved',
            student_id: student.id,
            supervisor_id: supervisor.id,
            faculty: 'Engineering, Design and Technology',
            year: 2025,
            image: '/images/iot_project.png'
        });

        await Project.create({
            title: 'AI-Powered Crop Disease Detection System',
            description: 'Machine learning application that identifies crop diseases from leaf images using convolutional neural networks. Trained on 50,000+ images with 94% accuracy. Mobile app allows farmers to get instant diagnoses and treatment recommendations in local languages.',
            technologies: 'Python, TensorFlow, Keras, Flutter, CNN, Image Processing',
            github_link: 'https://github.com/ucu/crop-disease-ai',
            status: 'approved',
            student_id: student2.id,
            supervisor_id: supervisor.id,
            faculty: 'Science and Technology',
            year: 2025,
            image: '/images/ai_machine_learning.png'
        });

        await Project.create({
            title: 'Enterprise Resource Planning Dashboard',
            description: 'Comprehensive ERP system for small and medium enterprises featuring inventory management, financial tracking, and employee management. Real-time analytics dashboard with predictive insights using machine learning for demand forecasting.',
            technologies: 'React, Node.js, PostgreSQL, Chart.js, Machine Learning',
            github_link: 'https://github.com/ucu/erp-system',
            status: 'approved',
            student_id: student2.id,
            supervisor_id: supervisor.id,
            faculty: 'Business and Administration',
            year: 2025,
            image: '/images/software_development.png'
        });

        await Project.create({
            title: 'Mobile Banking App for Rural Communities',
            description: 'Cross-platform mobile banking solution designed for underserved rural communities. Features offline transaction mode, SMS backup, biometric authentication, and support for local languages. Integrates with mobile money platforms and includes financial literacy modules.',
            technologies: 'React Native, Node.js, MongoDB, Blockchain, Biometrics',
            github_link: 'https://github.com/ucu/rural-banking',
            status: 'approved',
            student_id: student2.id,
            supervisor_id: supervisor.id,
            faculty: 'Business and Administration',
            year: 2025,
            image: '/images/mobile_app_dev.png'
        });

        await Project.create({
            title: 'Wearable Health Monitoring Device',
            description: 'IoT wearable that continuously tracks vital signs including heart rate, blood oxygen (SpO2), temperature, and activity levels. Data syncs to cloud for analysis and sends emergency alerts to designated contacts. Includes predictive health analytics.',
            technologies: 'Arduino, Sensors, Cloud IoT, Mobile App, Data Analytics',
            github_link: 'https://github.com/ucu/health-wearable',
            status: 'approved',
            student_id: student.id,
            supervisor_id: supervisor.id,
            faculty: 'Science and Technology',
            year: 2024,
            image: '/images/embedded_systems.png'
        });

        await Project.create({
            title: 'Legal Case Management System',
            description: 'Digital platform for law firms to manage cases, documents, and client communications. Features automated document generation, deadline tracking, case law research integration, and secure client portal. Compliant with data protection regulations.',
            technologies: 'Vue.js, Django, PostgreSQL, Document Processing, Encryption',
            github_link: 'https://github.com/ucu/legal-case-mgmt',
            status: 'approved',
            student_id: student2.id,
            supervisor_id: supervisor.id,
            faculty: 'Law',
            year: 2024,
            image: '/images/software_development.png'
        });

        await Project.create({
            title: 'Voice-Controlled Assistive Wheelchair',
            description: 'Innovative assistive technology featuring voice-controlled wheelchair navigation with obstacle avoidance. Uses speech recognition in multiple languages, ultrasonic sensors for safety, and GPS for outdoor navigation. Designed for individuals with limited mobility.',
            technologies: 'Raspberry Pi, Speech Recognition, Ultrasonic Sensors, GPS, Motor Control',
            github_link: 'https://github.com/ucu/voice-wheelchair',
            status: 'approved',
            student_id: student.id,
            supervisor_id: supervisor.id,
            faculty: 'Engineering, Design and Technology',
            year: 2025,
            image: '/images/robotics_project.png'
        });

        await Project.create({
            title: 'Interactive African Languages Learning Platform',
            description: 'Gamified e-learning platform for African languages with speech recognition for pronunciation practice. Features interactive lessons, cultural context, progress tracking, and community forums. Supports Luganda, Swahili, and other regional languages.',
            technologies: 'React, Node.js, Speech Recognition, Gamification, MongoDB',
            github_link: 'https://github.com/ucu/language-platform',
            status: 'approved',
            student_id: student2.id,
            supervisor_id: supervisor.id,
            faculty: 'Social Sciences',
            year: 2025,
            image: '/images/mobile_app_dev.png'
        });

        await Project.create({
            title: 'Climate Data Analysis and Prediction Tool',
            description: 'Advanced data science tool for analyzing climate patterns and predicting weather trends in East Africa. Uses historical data and machine learning models to forecast rainfall, temperature changes, and extreme weather events. Provides actionable insights for agriculture.',
            technologies: 'Python, Pandas, TensorFlow, Jupyter, Data Visualization, APIs',
            github_link: 'https://github.com/ucu/climate-analysis',
            status: 'approved',
            student_id: student.id,
            supervisor_id: supervisor.id,
            faculty: 'Science and Technology',
            year: 2024,
            image: '/images/ai_machine_learning.png'
        });

        console.log('✓ Sample projects created\n');

        console.log('✅ Database seeding completed successfully!\n');
        console.log('Demo credentials:');
        console.log('  Student:    student@ucu.ac.ug / password123');
        console.log('  Supervisor: supervisor@ucu.ac.ug / password123');
        console.log('  Admin:      admin@ucu.ac.ug / password123\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
