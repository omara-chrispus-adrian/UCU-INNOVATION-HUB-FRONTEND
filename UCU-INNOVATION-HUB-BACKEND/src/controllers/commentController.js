const { Comment, User } = require('../models');

// @desc    Get comments for a project
// @route   GET /api/comments/:projectId
// @access  Public
const getCommentsByProject = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { project_id: req.params.projectId },
            include: [
                { model: User, as: 'user', attributes: ['id', 'full_name', 'email', 'role'] }
            ],
            order: [['created_at', 'DESC']]
        });

        res.json({ comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create comment
// @route   POST /api/comments
// @access  Private
const createComment = async (req, res) => {
    try {
        const { project_id, content } = req.body;

        const comment = await Comment.create({
            project_id,
            user_id: req.user.id,
            content
        });

        const newComment = await Comment.findByPk(comment.id, {
            include: [
                { model: User, as: 'user', attributes: ['id', 'full_name', 'email', 'role'] }
            ]
        });

        res.status(201).json({ comment: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getCommentsByProject,
    createComment
};
