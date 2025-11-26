const { User } = require('../models');

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin)
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            order: [['created_at', 'DESC']]
        });

        res.json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update user role
// @route   PUT /api/users/:id/role
// @access  Private (Admin)
const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.update({ role });
        res.json({ user: user.toJSON(), message: 'User role updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getUsers,
    updateUserRole
};
