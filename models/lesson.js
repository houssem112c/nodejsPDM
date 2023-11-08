const mongoose = require('mongoose');
const lessonSchema = mongoose.Schema(
    {
        name: { type: String },
        age: { type: Number },
        bio: { type: String },
        photoUrl: { type: String },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('lesson', lessonSchema);