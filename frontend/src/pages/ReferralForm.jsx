import React, { useState } from 'react';
import { candidateAPI } from '../services/api';

const ReferralForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    resume: null
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*\.\w{2,3}$/; 
   if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }

    if (formData.resume) {
      if (formData.resume.type !== 'application/pdf') {
        newErrors.resume = 'Only PDF files are allowed';
      } else if (formData.resume.size > 5 * 1024 * 1024) {
        newErrors.resume = 'File size must be less than 5MB';
      }
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, resume: file }));
    if (errors.resume) {
      setErrors(prev => ({ ...prev, resume: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('jobTitle', formData.jobTitle);
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }

      // ✅ FIXED: Log the data being sent
      console.log('📤 Sending form data:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        jobTitle: formData.jobTitle,
        resume: formData.resume?.name
      });

      const response = await candidateAPI.createCandidate(formDataToSend);
      console.log('✅ Response:', response);
      
      setSubmitStatus({
        type: 'success',
        message: 'Candidate referred successfully!'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        jobTitle: '',
        resume: null
      });

      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('❌ Submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to submit referral. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header - Only one icon here */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Refer a Candidate</h2>
        <p className="text-blue-100">Help us grow our team by referring talented professionals</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {submitStatus && (
          <div className={`mb-6 p-4 rounded-xl flex items-center justify-between ${
            submitStatus.type === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center gap-3">
              {/* ✅ FIXED: Only one icon shows */}
              <span className="text-xl">
                {submitStatus.type === 'success' ? '✅' : '❌'}
              </span>
              <span className={submitStatus.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                {submitStatus.message}
              </span>
            </div>
            <button
              onClick={() => setSubmitStatus(null)}
              className={`p-1 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'hover:bg-green-200 text-green-700' 
                  : 'hover:bg-red-200 text-red-700'
              }`}
            >
              ✕
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="form-label">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Enter candidate's full name"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="form-label">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Enter candidate's email"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="form-label">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              maxLength="10"
              className={`form-input ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="10-digit mobile number"
            />
            {errors.phone && (
              <p className="mt-2 text-sm text-red-600">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Job Title Field */}
          <div>
            <label htmlFor="jobTitle" className="form-label">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              className={`form-input ${errors.jobTitle ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Enter position they're applying for"
            />
            {errors.jobTitle && (
              <p className="mt-2 text-sm text-red-600">
                {errors.jobTitle}
              </p>
            )}
          </div>

          {/* Resume Upload Field */}
          <div>
            <label htmlFor="resume" className="form-label">
              Resume (PDF only, max 5MB)
            </label>
            <div className={`relative border-2 border-dashed rounded-xl p-6 transition-all ${
              errors.resume 
                ? 'border-red-300 bg-red-50' 
                : formData.resume 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}>
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center">
                {formData.resume ? (
                  <>
                    <span className="text-3xl mb-2 block">📎</span>
                    <p className="text-sm font-medium text-gray-900">{formData.resume.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </>
                ) : (
                  <>
                    <span className="text-3xl mb-2 block">📤</span>
                    <p className="text-sm font-medium text-gray-700">
                      Click or drag and drop to upload
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF only, max 5MB
                    </p>
                  </>
                )}
              </div>
            </div>
            {errors.resume && (
              <p className="mt-2 text-sm text-red-600">
                {errors.resume}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                'Refer Candidate'
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  jobTitle: '',
                  resume: null
                });
                const fileInput = document.querySelector('input[type="file"]');
                if (fileInput) fileInput.value = '';
                setErrors({});
              }}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReferralForm;