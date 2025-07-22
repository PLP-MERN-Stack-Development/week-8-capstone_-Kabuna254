const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  applyForJob,
  getMyApplications,
  getApplicationsForJob
} = require('../controllers/applicationController');

router.post('/', protect, applyForJob);
router.get('/me', protect, getMyApplications);
router.get('/job/:jobId', protect, getApplicationsForJob);

module.exports = router;
