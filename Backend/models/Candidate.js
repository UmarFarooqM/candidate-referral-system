const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [
      /^\d{10}$/,
      'Phone number must be 10 digits'
    ]
  },
  jobTitle: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  status: {
    type: String,
    enum: {
      values: ['Pending', 'Reviewed', 'Hired'],
      message: '{VALUE} is not a valid status'
    },
    default: 'Pending'
  },
  resumeUrl: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Index for search functionality
candidateSchema.index({ jobTitle: 'text', status: 'text' });

module.exports = mongoose.model('Candidate', candidateSchema);