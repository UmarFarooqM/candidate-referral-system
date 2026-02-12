const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const candidateRoutes = require('./routes/candidateRoutes');

// Import middleware
const { errorHandler } = require('./middleware/errorMiddleware');

// Initialize express
const app = express();

// ✅ FIXED: CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ FIXED: Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ FIXED: Routes
app.use('/api/candidates', candidateRoutes);

// ✅ FIXED: Root route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Candidate Referral API',
    endpoints: {
      candidates: 'GET /api/candidates',
      create: 'POST /api/candidates',
      stats: 'GET /api/candidates/stats',
      updateStatus: 'PUT /api/candidates/:id/status',
      delete: 'DELETE /api/candidates/:id'
    }
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📁 API Base URL: http://localhost:${PORT}/api`);
    console.log(`🔍 Test API: http://localhost:${PORT}/`);
  });
});