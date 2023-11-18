const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Route for creating a new comment
router.post('/', commentController.createComment);

// Route for fetching comments by lesson ID
router.get('/lesson/:lessonId', commentController.getCommentsByLessonId);

module.exports = router;
