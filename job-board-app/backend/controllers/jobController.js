const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, postedBy: req.user._id });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Job creation failed' });
  }
};

exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find().populate('postedBy', 'name email');
  res.json(jobs);
};

exports.getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id).populate('postedBy', 'name email');
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
};

exports.updateJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });

  if (job.postedBy.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized to update this job' });
  }

  Object.assign(job, req.body);
  await job.save();
  res.json(job);
};

exports.deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });

  if (job.postedBy.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized to delete this job' });
  }

  await job.deleteOne();
  res.json({ message: 'Job deleted' });
};
