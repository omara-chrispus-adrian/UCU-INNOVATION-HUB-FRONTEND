const { Project, User } = require('../models');
const { sequelize } = require('../config/database');

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private
const getDashboard = async (req, res) => {
    try {
        const totalProjects = await Project.count();
        const pendingProjects = await Project.count({ where: { status: 'pending' } });
        const approvedProjects = await Project.count({ where: { status: 'approved' } });
        const rejectedProjects = await Project.count({ where: { status: 'rejected' } });
        const totalUsers = await User.count();

        res.json({
            totalProjects,
            pendingProjects,
            approvedProjects,
            rejectedProjects,
            totalUsers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get projects by faculty
// @route   GET /api/analytics/projects-by-faculty
// @access  Public
const getProjectsByFaculty = async (req, res) => {
    try {
        const results = await Project.findAll({
            attributes: [
                'faculty',
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            group: ['faculty'],
            raw: true
        });

        res.json({ data: results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get trending technologies
// @route   GET /api/analytics/trending-technologies
// @access  Public
const getTrendingTechnologies = async (req, res) => {
    try {
        const projects = await Project.findAll({
            attributes: ['technologies'],
            where: { technologies: { [sequelize.Op.ne]: null } }
        });

        const techCount = {};
        projects.forEach(project => {
            if (project.technologies) {
                const techs = project.technologies.split(',').map(t => t.trim());
                techs.forEach(tech => {
                    techCount[tech] = (techCount[tech] || 0) + 1;
                });
            }
        });

        const sorted = Object.entries(techCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([name, count]) => ({ name, count }));

        res.json({ data: sorted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get approval rates
// @route   GET /api/analytics/approval-rates
// @access  Private
const getApprovalRates = async (req, res) => {
    try {
        const total = await Project.count();
        const approved = await Project.count({ where: { status: 'approved' } });
        const rejected = await Project.count({ where: { status: 'rejected' } });
        const pending = await Project.count({ where: { status: 'pending' } });

        res.json({
            total,
            approved,
            rejected,
            pending,
            approvalRate: total > 0 ? ((approved / total) * 100).toFixed(2) : 0
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getDashboard,
    getProjectsByFaculty,
    getTrendingTechnologies,
    getApprovalRates
};
