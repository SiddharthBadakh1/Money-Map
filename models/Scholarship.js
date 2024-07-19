const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
    name: String,
    educationQualification: String,
    cgpa: Number,
    gender: String,
    type: String // 'sports' or 'academic'
});

module.exports = mongoose.model('Scholarship', scholarshipSchema);