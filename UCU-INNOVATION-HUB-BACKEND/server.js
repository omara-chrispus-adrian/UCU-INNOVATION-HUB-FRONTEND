const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize, testConnection } = require('./src/config/database');
const { User, Project, Comment } = require('./src/models');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/projects', require('./src/routes/projects'));
app.use('/api/analytics', require('./src/routes/analytics'));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/comments', require('./src/routes/comments'));

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'UCU Innovation Hub API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Test database connection
        await testConnection();

        // Sync database (create tables if they don't exist)
        await sequelize.sync({ alter: false });
        console.log('✓ Database synchronized');

        // Start listening
        app.listen(PORT, () => {
            console.log(`\n🚀 Server running on port ${PORT}`);
            console.log(`📍 API: http://localhost:${PORT}/api`);
            console.log(`💚 Health check: http://localhost:${PORT}/api/health\n`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
