const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resumeLink: String,
  coverLetter: String,
  status: { type: String, default: 'Submitted' },
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
