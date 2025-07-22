const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} = require('../controllers/jobController');

router.route('/')
  .get(getAllJobs)
  .post(protect, createJob);

router.route('/:id')
  .get(getJobById)
  .put(protect, updateJob)
  .delete(protect, deleteJob);

module.exports = router;
