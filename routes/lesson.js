const express = require('express');
const { body } = require('express-validator');

const lessonController = require('../controllers/lessonController');
const uploadImage = require('../middleware/upload-image');

const router = express.Router();

router.get('/lessons', lessonController.getAlllessons);

router.get('/lesson/:lessonId', lessonController.getSinglelessons);

router.delete('/lesson/:lessonId', lessonController.deletelesson);

router.post('/lesson', uploadImage,
    [
        body('name')
            .notEmpty()
            .withMessage('Please enter lesson name!'),
        body('age')
            .notEmpty()
            .withMessage("Please enter the lesson's age")
            .isInt()
            .withMessage("Age must be an integer"),
        body('bio')
            .trim()
            .notEmpty()
            .withMessage("Please enter the lesson's biography")
            .isLength({ min: 15 })
            .withMessage('The biography must be at least 15 characters'),
    ],
    lessonController.addlesson
);

router.put('/lesson/:lessonId', uploadImage,
    [
        body('name')
            .notEmpty()
            .withMessage('Please enter lesson name!'),
        body('age')
            .notEmpty()
            .withMessage("Please enter the lesson's age")
            .isInt()
            .withMessage("Age must be an integer"),
        body('bio')
            .trim()
            .notEmpty()
            .withMessage("Please enter the lesson's biography")
            .isLength({ min: 15 })
            .withMessage('The biography must be at least 15 characters'),
    ],
    lessonController.updatelesson);

module.exports = router;