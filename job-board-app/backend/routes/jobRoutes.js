const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} = require('../controllers/jobController');

router.route('/')
  .get(getAllJobs) // Public
  .post(protect, allowRoles('employer'), createJob); // Only employers

router.route('/:id')
  .get(getJobById) // Public
  .put(protect, allowRoles('employer'), updateJob) // Only employers
  .delete(protect, allowRoles('employer'), deleteJob); // Only employers

module.exports = router;
