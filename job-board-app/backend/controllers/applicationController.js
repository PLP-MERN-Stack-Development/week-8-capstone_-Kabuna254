const Application = require('../models/Application');
const Job = require('../models/Job');

exports.applyForJob = async (req, res) => {
  const { jobId, resumeLink, coverLetter } = req.body;
  try {
    const application = await Application.create({
      jobId,
      applicantId: req.user._id,
      resumeLink,
      coverLetter
    });
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Application submission failed' });
  }
};

exports.getMyApplications = async (req, res) => {
  const applications = await Application.find({ applicantId: req.user._id }).populate('jobId');
  res.json(applications);
};

exports.getApplicationsForJob = async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  if (!job) return res.status(404).json({ message: 'Job not found' });

  if (job.postedBy.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized to view applications for this job' });
  }

  const applications = await Application.find({ jobId: req.params.jobId }).populate('applicantId');
  res.json(applications);
};
