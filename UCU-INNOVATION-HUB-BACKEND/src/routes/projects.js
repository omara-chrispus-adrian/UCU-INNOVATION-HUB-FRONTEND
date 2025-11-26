const express = require('express');
const router = express.Router();
const {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getMyProjects,
    approveProject,
    rejectProject
} = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getProjects);
router.get('/my-projects', protect, getMyProjects);
router.get('/:id', getProjectById);
router.post('/', protect, authorize('student'), createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);
router.post('/:id/approve', protect, authorize('supervisor', 'admin'), approveProject);
router.post('/:id/reject', protect, authorize('supervisor', 'admin'), rejectProject);

module.exports = router;
