const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  projectTitle: {
    type: String,
    required: true
  },
  projectDescription: {
    type: String,
    required: true
  },
  problemStatement: {
    type: String,
    required: true
  },
  amountRequested: {
    type: Number,
    required: true
  },
  budgetBreakdown: {
    type: String,
    required: true
  },
  marketSegment: {
    type: String,
    required: true
  },
  uniqueSellingProposition: {
    type: String,
    required: true
  },
  previousExperience: {
    type: String,
    required: true
  },
  projectTimeline: {
    type: String,
    required: true
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
