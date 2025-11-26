const { Project, User } = require('../models');
const { Op } = require('sequelize');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
    try {
        const { faculty, year, status, search } = req.query;
        const where = {};

        if (faculty) where.faculty = faculty;
        if (year) where.year = year;
        if (status) where.status = status;
        if (search) {
            where[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } },
                { technologies: { [Op.like]: `%${search}%` } }
            ];
        }

        const projects = await Project.findAll({
            where,
            include: [
                { model: User, as: 'student', attributes: ['id', 'full_name', 'email'] },
                { model: User, as: 'supervisor', attributes: ['id', 'full_name', 'email'] }
            ],
            order: [['created_at', 'DESC']]
        });

        res.json({ projects });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id, {
            include: [
                { model: User, as: 'student', attributes: ['id', 'full_name', 'email'] },
                { model: User, as: 'supervisor', attributes: ['id', 'full_name', 'email'] }
            ]
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json({ project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private (Student)
const createProject = async (req, res) => {
    try {
        const { title, description, technologies, github_link, faculty, year } = req.body;

        const project = await Project.create({
            title,
            description,
            technologies,
            github_link,
            faculty,
            year,
            student_id: req.user.id,
            status: 'pending'
        });

        res.status(201).json({ project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Student - own projects)
const updateProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check ownership
        if (project.student_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this project' });
        }

        const { title, description, technologies, github_link, faculty, year } = req.body;

        await project.update({
            title: title || project.title,
            description: description || project.description,
            technologies: technologies || project.technologies,
            github_link: github_link || project.github_link,
            faculty: faculty || project.faculty,
            year: year || project.year
        });

        res.json({ project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Student - own projects, Admin)
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check ownership
        if (project.student_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this project' });
        }

        await project.destroy();
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get my projects
// @route   GET /api/projects/my-projects
// @access  Private
const getMyProjects = async (req, res) => {
    try {
        const where = {};

        if (req.user.role === 'student') {
            where.student_id = req.user.id;
        } else if (req.user.role === 'supervisor') {
            where.supervisor_id = req.user.id;
        }

        const projects = await Project.findAll({
            where,
            include: [
                { model: User, as: 'student', attributes: ['id', 'full_name', 'email'] },
                { model: User, as: 'supervisor', attributes: ['id', 'full_name', 'email'] }
            ],
            order: [['created_at', 'DESC']]
        });

        res.json({ projects });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Approve project
// @route   POST /api/projects/:id/approve
// @access  Private (Supervisor, Admin)
const approveProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.update({
            status: 'approved',
            supervisor_id: req.user.id
        });

        res.json({ project, message: 'Project approved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Reject project
// @route   POST /api/projects/:id/reject
// @access  Private (Supervisor, Admin)
const rejectProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.update({
            status: 'rejected',
            supervisor_id: req.user.id
        });

        res.json({ project, message: 'Project rejected' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getMyProjects,
    approveProject,
    rejectProject
};
