// Create a Job
const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  if (req.user.role !== 'employer') {
    return res.status(403).json({ message: 'Only employers can create jobs.' });
  }

  try {
    const job = await Job.create({ ...req.body, postedBy: req.user._id });
    res.status(201).json(job);
  } catch (error) {
    console.error('Job Creation Error:', error.message);
    res.status(500).json({ message: 'Job creation failed' });
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  if (req.user.role !== 'employer') {
    return res.status(403).json({ message: 'Only employers can update jobs.' });
  }

  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to update this job.' });
    }

    Object.assign(job, req.body);
    await job.save();
    res.json(job);

  } catch (error) {
    res.status(500).json({ message: 'Failed to update job' });
  }
};

// Delete Job
exports.deleteJob = async (req, res) => {
  if (req.user.role !== 'employer') {
    return res.status(403).json({ message: 'Only employers can delete jobs.' });
  }

  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this job.' });
    }

    await job.deleteOne();
    res.json({ message: 'Job deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Failed to delete job' });
  }
};
