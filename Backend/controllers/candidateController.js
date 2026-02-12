const Candidate = require('../models/Candidate');

// @desc    Get all candidates
// @route   GET /api/candidates
// @access  Public
const getCandidates = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    // Search functionality
    if (search) {
      query = {
        $or: [
          { jobTitle: { $regex: search, $options: 'i' } },
          { status: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const candidates = await Candidate.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: candidates.length,
      data: candidates
    });
  } catch (error) {
    console.error('Error in getCandidates:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching candidates',
      error: error.message
    });
  }
};

// @desc    Get candidate statistics
// @route   GET /api/candidates/stats
// @access  Public
const getCandidateStats = async (req, res) => {
  try {
    const total = await Candidate.countDocuments();
    const pending = await Candidate.countDocuments({ status: 'Pending' });
    const reviewed = await Candidate.countDocuments({ status: 'Reviewed' });
    const hired = await Candidate.countDocuments({ status: 'Hired' });

    res.status(200).json({
      success: true,
      data: {
        total,
        pending,
        reviewed,
        hired
      }
    });
  } catch (error) {
    console.error('Error in getCandidateStats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};

// @desc    Create a candidate
// @route   POST /api/candidates
// @access  Public
const createCandidate = async (req, res) => {
  try {
    console.log('📥 Received candidate data:', req.body);
    console.log('📎 Received file:', req.file);

    const candidateData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      jobTitle: req.body.jobTitle,
      status: 'Pending'
    };

    // Add resume URL if file was uploaded
    if (req.file) {
      candidateData.resumeUrl = `/uploads/${req.file.filename}`;
    }

    // Check if candidate with same email already exists
    const existingCandidate = await Candidate.findOne({ email: req.body.email });
    if (existingCandidate) {
      return res.status(400).json({
        success: false,
        message: 'Candidate with this email already exists'
      });
    }

    const candidate = await Candidate.create(candidateData);

    res.status(201).json({
      success: true,
      message: 'Candidate created successfully',
      data: candidate
    });
  } catch (error) {
    console.error('❌ Error creating candidate:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating candidate'
    });
  }
};

// @desc    Update candidate status
// @route   PUT /api/candidates/:id/status
// @access  Public
const updateCandidateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    candidate.status = status;
    await candidate.save();

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: candidate
    });
  } catch (error) {
    console.error('Error in updateCandidateStatus:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating candidate status',
      error: error.message
    });
  }
};

// @desc    Delete candidate
// @route   DELETE /api/candidates/:id
// @access  Public
const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    await candidate.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Candidate deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteCandidate:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting candidate',
      error: error.message
    });
  }
};

// ✅ EXPORT all functions correctly
module.exports = {
  getCandidates,
  getCandidateStats,
  createCandidate,
  updateCandidateStatus,
  deleteCandidate
};