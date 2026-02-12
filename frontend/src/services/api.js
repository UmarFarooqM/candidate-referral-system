import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // 30 seconds timeout
});

// Request interceptor for logging
api.interceptors.request.use(request => {
  console.log('🚀 Request:', request.method.toUpperCase(), request.url);
  return request;
});

// Response interceptor for error handling
api.interceptors.response.use(
  response => {
    console.log('✅ Response:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('❌ API Error:', error.message);
    if (error.code === 'ECONNREFUSED') {
      return Promise.reject({
        response: {
          data: {
            message: 'Cannot connect to server. Please make sure the backend is running.'
          }
        }
      });
    }
    return Promise.reject(error);
  }
);

export const candidateAPI = {
  getCandidates: async (searchTerm = '') => {
    try {
      const response = await api.get('/candidates', {
        params: { search: searchTerm }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getStats: async () => {
    try {
      const response = await api.get('/candidates/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createCandidate: async (formData) => {
    try {
      const response = await api.post('/candidates', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateStatus: async (id, status) => {
    try {
      const response = await api.put(`/candidates/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteCandidate: async (id) => {
    try {
      const response = await api.delete(`/candidates/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;