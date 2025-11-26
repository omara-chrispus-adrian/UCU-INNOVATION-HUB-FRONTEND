const express = require('express');
const router = express.Router();
const {
    getDashboard,
    getProjectsByFaculty,
    getTrendingTechnologies,
    getApprovalRates
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

router.get('/dashboard', protect, getDashboard);
router.get('/projects-by-faculty', getProjectsByFaculty);
router.get('/trending-technologies', getTrendingTechnologies);
router.get('/approval-rates', protect, getApprovalRates);

module.exports = router;
