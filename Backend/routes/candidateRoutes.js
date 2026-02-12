const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const {
  validateCandidate,
  validateStatus
} = require('../middleware/validationMiddleware');

// ✅ IMPORT all controller functions
const {
  getCandidates,
  getCandidateStats,
  createCandidate,
  updateCandidateStatus,
  deleteCandidate
} = require('../controllers/candidateController');

// ✅ TEST ROUTE - Remove this after testing
router.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Routes
router.route('/')
  .get(getCandidates)
  .post(upload.single('resume'), validateCandidate, createCandidate);

router.get('/stats', getCandidateStats);

router.route('/:id/status')
  .put(validateStatus, updateCandidateStatus);

router.route('/:id')
  .delete(deleteCandidate);

module.exports = router;