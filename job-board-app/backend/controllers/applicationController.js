// Delete an Application
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.applicationId).populate('jobId');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const isApplicant = application.applicantId.toString() === req.user._id.toString();
    const isEmployer = application.jobId?.postedBy?.toString() === req.user._id.toString();

    if (!isApplicant && !isEmployer) {
      return res.status(403).json({ message: 'Not authorized to delete this application' });
    }

    await application.deleteOne();
    res.json({ message: 'Application deleted successfully' });

  } catch (error) {
    console.error('Delete Application Error:', error.message);
    res.status(500).json({ message: 'Failed to delete application' });
  }
};
// Get Applications for a Job
exports.getApplicationsForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).populate('applications');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job.applications);
  } catch (error) {
    console.error('Get Applications for Job Error:', error.message);
    res.status(500).json({ message: 'Failed to retrieve applications' });
  }
} 
