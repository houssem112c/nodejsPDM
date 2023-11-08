const lesson = require('../models/lesson');
const sydFunctions = require('../utils/syd-functions');

exports.getAlllessons = async (req, res, next) => {
    try {
        const list = await Lesson.find(); // Use "Lesson" instead of "lesson"
        res.status(200).json({ message: "List of lessons", list: list });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }
};

exports.getSinglelessons = async (req, res, next) => {
    const lessonId = req.params.lessonId;
    try {
        const lesson = await Lesson.findById(lessonId); 
        if (!lesson) {
            return res.status(404).json({ message: 'lesson not found!' });
        }
        res.status(200).json({ message: "Retrieved lesson", lesson: lesson });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }

};

exports.addlesson = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation error', error: errorMessage });
    }
    if (!req.file) {
        return res.status(422).json({ message: 'Please add an image!' });
    }

    const Lesson = new lesson({
        name: req.body.name,
        age: req.body.age,
        bio: req.body.bio,
        photoUrl: req.file.path.replace("\\", "/") // If you are on Linux or Mac just use req.file.path
    });

    try {
        const result = await Lesson.save()
        console.log('result', result);
        return res.status(201).json({
            message: "lesson is successfully added!",
            lesson: result
        });
    } catch (error) {
        console.log('error', error);
        if (req.file) {
            sydFunctions.deleteImage(lesson.photoUrl);
        }
        res.status(500).json({ message: 'Creation failed!' });
    }
};

exports.updatelesson = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation failed!', error: errorMessage });
    }

    let photoUrl = req.body.image;
    if (req.file) {
        photoUrl = req.file.path.replace("\\", "/");
    }
    if (!photoUrl) {
        return res.status(422).json({ message: 'Please add an image!' });
    }

    const lessonId = req.params.lessonId;
    try {
        const lesson = await lesson.findById(lessonId);
        if (!lesson) {
            sydFunctions.deleteImage(req.file.path.replace("\\", "/"));
            return res.status(404).json({ message: 'lesson not found!' });
        }
        if (photoUrl !== lesson.photoUrl) {
            sydFunctions.deleteImage(lesson.photoUrl);
        }
        lesson.name = req.body.name;
        lesson.age = req.body.age;
        lesson.bio = req.body.bio;
        lesson.photoUrl = photoUrl;
        const result = await lesson.save();
        res.status(200).json({ 'message': 'Modification successfully completed!', lesson: result });

    } catch (error) {
        console.log('error', error);
        if (req.file) {
            sydFunctions.deleteImage(lesson.photoUrl);
        }
        res.status(500).json({ message: 'Update failed!' });
    }

};

exports.deletelesson = async (req, res, next) => {
    const LessonId = req.params.lessonId;
    try {
        const Lesson = await lesson.findById(LessonId);
        if (!Lesson) {
            return res.status(404).json({ message: 'lesson not found!' });
        }

        sydFunctions.deleteImage(Lesson.photoUrl);
        await lesson.findByIdAndRemove(LessonId);
        res.status(200).json({ 'message': 'Deletion completed successfully!' });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Delete failed!' });
    }
};

