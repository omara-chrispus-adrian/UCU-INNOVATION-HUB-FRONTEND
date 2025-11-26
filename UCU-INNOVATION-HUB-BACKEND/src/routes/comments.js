const express = require('express');
const router = express.Router();
const { getCommentsByProject, createComment } = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

router.get('/:projectId', getCommentsByProject);
router.post('/', protect, createComment);

module.exports = router;
